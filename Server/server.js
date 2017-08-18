const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const ServerFunk = require('./server_funcs')

const app = express()
const players = []


const port = process.env.PORT || 3001;
const Database = require('./dbfunk')
const db = new Database()
const users = {}

/***********************************
  testing and server-side functions to run in routes
***********************************/


// 4-character random generator for roomCode/testing
const codeGen = () => {
  const codeVal = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let val = ""
  for (var i = 0; i < 4; i++){
    val += codeVal[Math.floor(Math.random()* 36)]
  }
  return val
}

// shuffles array into new order, for target assignment
const shuffle = (array) => {
 var m = array.length
 var t = 0
 var i = 0
 while (m) {
   i = Math.floor(Math.random() * m--);
   t = array[m];
   array[m] = array[i];
   array[i] = t;
 }
 return array
}

// sql genterator for target assignment that loops through each player in a list
// and assigns the next person as their target and accounts for out of bounds index
const SQLgen = (array) => {
  var count = 0
  let SQLval = `UPDATE players SET target = CASE username `
  while (count < array.length) {
    var nextTarget = array[count + 1] == undefined ? array[0] : array[count + 1]
    SQLval += `WHEN '${array[count]}' THEN '${nextTarget}' `
    count++
  }
  SQLval += `END`
  return SQLval
}

//organizer function that flattens an array of objects to an array of names
const organizer = (arr) => {
	for(var i = 0; i < arr.length; i++){
		arr[i]  = arr[i].username
	}
  return arr
}

/***************************************
app routes starting here, first is middleware
so every route afterwards uses said middleware,
ordering between middleware and routes selects
which routes use what middleware
***************************************/


// middleware for parsing data into javascript and
//connection to database
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(db.connectToDB.bind(db))
app.use(express.static(path.join(__dirname, '..', 'build')))

// setting the superSceret for sign up and login
app.set('superSecret', "secretTUNNELthroughTHEmountain");

// sign up page when user hits sign up button after entering username and password
// first checks if user exists in the database, if username exists, sends a message that user exists
// if username doesn't exist then the username and password are stored in the database
//TODO: hash the password before storing it
app.post('/signup', (req, res) => {
  const {username} = req.body
  const password = bcrypt.hashSync(req.body.password, 10)
  const userQuery = `SELECT * FROM players WHERE username = ?`

  req.query(userQuery, [username], (err, result) => {
    if(err){
      console.log(err)
      throw err
    }
    if(!result[0]) {
      const sql = `INSERT INTO players (username, password)  VALUES (?, ?);`
      req.query(sql, [username, password], (err, result) => {

        if(err){
          res.status(500).json({message: 'Da database done broke, cuz', success:false, err})

        } else {
          var token = jwt.sign({username}, app.get('superSecret'), {
            expiresIn: "2days"
          });

          res.json({success:true, message: "well done, butch!", result, token})
        }
      })
    } else if(result[0]){
      res.status(500).json({success:false, message: 'That there user already exists hog'})
    }
  })
})
// authenticate used when a person enters their username and password then hits the login Button
// checks to see if they already exist, if not then sends a message: user not found
// if the user exists then they are given a token
app.post('/authenticate', (req, res) => {
  const {username, password} = req.body
  const userQuery = `SELECT username FROM players WHERE username = ?`
  const passQuery = `SELECT password FROM players WHERE username = ?`

  req.query(userQuery, [username], (err, result) => {
    if(err){
      console.log(err)
      throw err
    }
    if(!result[0]) {
      res.json({success: false, message: 'theys not from round here'})
    } else if(result[0]) {
      req.query(passQuery, [username], (err, result) => {
        if(err){
          console.log(err)
          throw err
        }
        if(!bcrypt.compareSync(password, result[0].password)) {
          console.log(result[0].password)
          res.json({success: false, message: 'password not found'})
        } else if(bcrypt.compareSync(password, result[0].password)) {
          var token = jwt.sign({username}, app.get('superSecret'), {
            expiresIn: "2days"
          });
          res.json({success: true, message: "you're in", token })
        } else {
          res.json({success: false, message: "something went very wrong"})
        }
      })
    }
  })
})

 app.post('/auto/authenticate', (req, res) => {
  const {username, token} = req.body;
  const userQuery = `SELECT * FROM players WHERE username = ?`
  req.query(userQuery, [username], (err, result) => {
    if(err){
      res.status(500).json({message: "dun had an error", err})
    } if(!result[0]) {
      res.json({success: false, message: 'user not found'})
    } else {
      let sqlQuery = `SELECT roomCode FROM playersToGames WHERE username = ?`
      req.query(sqlQuery, [username], (err2, result2) => {
        if(err){
          res.status(500).json({success: false, err2})
        } else {
          jwt.verify(token, app.get('superSecret'), function(err2, decoded ){
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.'});
            } else {
              return res.json({
                                success: true,
                                username: username,
                                roomCode: result2[0] && result2[0].roomCode,
                                alive: result[0].alive,
                              })
            }
          })
        }
      })
    }
  })
})


// middleware after token is provided to front end,
// every route then checks the token legitemacy before proceeding

app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

//route used to insert a new room into the database, doesn't add players or anything else
app.post('/room', (req, res) => {
  const {roomCode} = req.body
  const code = codeGen()
  const sql = `INSERT INTO games (roomCode, active) VALUES (?, ?)`
  req.query(sql, [roomCode, 0], (err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Fix the damn ac, JSON! C'mon now!", err})
    }else {
      res.json({success:true, message: "Y'all nu' gunna die today, Butch!", result})
    }
  })
})

// route used to set the player who creates the room as the admin on playersToGames in database
app.put('/room/admin', (req, res) => {
  const {roomCode, username} = req.body
  const sql = `UPDATE playersToGames SET admin = 'true' WHERE username = ?`
  req.query(sql, [username], (err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Gator got yer arm, Butch!", err})
    } else {
      res.json({success:true, message: 'Poke that Gators eye, Cletus!', result})
    }
  })
})

// route used to add a player into a room on the database
app.put('/room/add',(req, res) => {
  const {username, roomCode} = req.body
  let user = username
  const sqlQuerty = "SELECT * FROM playersToGames WHERE roomCode = ?"
  req.query(sqlQuerty, [roomCode], (err, result) => {
    if (err){
      res.status(500).json({message: "sup Nerds",err, success: false})
    }
    else if(!result[0]){
      console.log("no indexs")
      const sql = `INSERT INTO PlayersToGames
                    (roomCode, username)
                    VALUES (?,?);`
      req.query(sql, [roomCode, username], (err2, result2) =>{
        if (err2){
          console.log("if err fired", err2)
          res.status(500).json({success:false, message: 'Database Error', error: err2})
        } else {
          console.log("else in query fired")
          res.json({success: true, message: 'ye-ah, got ye in thee room good sir', result2})
        }
      })
    }
    else{
      let count = 0
      for(var i = 0; i < result.length; i++ ){
        val = result[i]
          if(val.username == user){
            count++
          }
        }
        if (count < 1){
          const sql = `INSERT INTO PlayersToGames
                        (roomCode, username)
                        VALUES (?,?);`
          req.query(sql, [roomCode, username], (err2, result2) =>{
            if (err2){
              res.status(500).json({message: 'Database Error',success: false, error: err2})
            } else {
              console.log("else in query fired")
              res.json({success: true, message: 'ye-ah, got ye in thee room good sir', result2})
            }
          })
        }
        else{
          res.json({message: "user already entered", success: false})
        }
      }
  })
})

// route  used when games is started to set all players alive stautus to true and the room to active
app.put('/room/start', (req, res) => {
  const {roomCode} = req.body
  const sql = ` UPDATE players, games SET alive = 'true', active = 1 WHERE roomCode = ?`
  req.query(sql, [roomCode], (err, result) => {
    if (err){
      res.status(500).json({success:false, message: "Imma feed you to da gators, Butch!", err})
    }else{
      res.json({success:true, message: 'Eeeeeeeeeeeiii', result})
    }
  })
})
// checking if the room is active or not to redirect people in room.js to loading.js
app.get('/room/redirect/:roomCode', (req, res) => {
  let {roomCode} = req.params
  const sql = `SELECT * from GAMES WHERE roomCode = ?`
  req.query(sql,[roomCode], (err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Get away from that horse!!!", err})
    } else {
      res.json({success:true, message: "Weeee, git them glators, Cletus!", active: result[0].active, result})
    }
  })
})

/********************
redundant route    use : user/list:roomCode
********************/

// grabs data as preparation to assign targets,
app.put('/user/targets', (req, res) => {
  const {roomCode} = req.body
  const sql = `SELECT username, admin FROM playersToGames
              WHERE roomCode = ?`
  req.query(sql, [roomCode], (err, result) => {
    if(err){
      res.status(500).json({success:false, message: 'Ma, get out here, that Gator dun eat Butch!', err})
    }else{
      res.json({success:true, messege: 'Ma, get out here, Butch dun eat that Gator!', result})
    }
  })
})

// assigns targets with a shuffler to make each target a random target without overlaps or duplicates
app.put('/user/targets/assign', (req, res) => {
  let {result} = req.body
  result = organizer(result)
  result = shuffle(result)
  let sql = SQLgen(result)
  console.log("sql name ", result, sql)
  req.query(sql, (err, answer) => {
    if(err){
      res.status(500).json({success: false, message: "Pa, there's a damn armadill in the house!", err})
    } else {
      res.json({success:true, message: "Ma, this here armadill pie is de best you ever made", answer})
    }
  })
})

// heartbeat route for game page to send data used to update the databased
app.put('/user/heartbeat', (req, res) => {
  const {username, latitude, longitude} = req.body
  const sql = `UPDATE players SET latitude = ?, longitude = ? WHERE username = ?`
  req.query(sql, [latitude, longitude, username], (err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Cletus, stop peein on Butch's practicing tree!", err})
    } else {
      res.json({success:true, message: "This here tree is the happiest darned tree in Louisiana!", result})
    }
  })
})

//user heartbeat to send data from database to the front-end with distance data, and compass angle, among other data
app.get('/user/game/data/:username', (req, res) => {
  let username = req.params.username
  let sql = `SELECT * FROM players`
  req.query(sql, (err, allPlayers) => {
     console.log('allplayers', allPlayers, username)
     let serve = new ServerFunk(allPlayers,username)
     let theta = serve.getTheta()
     let distance = serve.getDistance()
     let target = serve.getTarget()
     let targetsTarget = serve.getTargetsTarget()
     let listObj = serve.getListObj()

    if(err) {
      res.status(500).json({success:false, message:"I'm Daniel Boon, checkout my coon hat", err})
    }
    else {
      res.json({success:true, message:  "sup Daniel Boon", allPlayers, theta, distance, target, targetsTarget, listObj})
    }
  })
})

// grabs all players with their admin property inside a specific room
app.get('/user/list/:roomCode/:username', (req, res) => {
  const roomCode = req.params.roomCode
  let { username } = req.params
  const sql = `SELECT * FROM playersToGames WHERE roomCode = ?`
  req.query(sql,[roomCode],(err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Butch, go help yer Uncle!", err})
    } else {

      let creator = ""
      let targets = result.slice()
      result.forEach(val => {
        if (val.admin == 'true'){
          creator = val.username
        }
      })
      let players = organizer(result)

      let sqlQuery = `SELECT * FROM players`
      req.query(sqlQuery, (err, result2) => {
        if (err){
          res.status(500).json({success: false, message:"blah blah blah", err })
        }
        else{
          let serve = new ServerFunk(result2, username)
          let theta = serve.getTheta()
          let distance = serve.getDistance()
          let listObj = serve.getListObj()
          let listArr = serve.getListArr()

          let playersInRoomObj = {}
          let playersInRoomArr = []
          players.forEach(name => {
            console.log("names", name)
            if (listObj[name]){
              playersInRoomObj[name] = listObj[name]
              console.log(playersInRoomObj)
            }
          })

          playersInRoomArr = Object.values(playersInRoomObj)
          res.json({success:true, message: "That horse needs help, Cletus",  playersInRoomObj, playersInRoomArr, targets, players, creator})
        }
      })
    }
  })
})

// used on kill button being hit, check's if target is in distance to be killed.
// if target is close enough, then sets that person's alive status to false, then assisns
// the killer a new target
app.post('/user/kill', (req, res) => {
  const {list, username} = req.body
  console.log('listkill', list)
  let serve = new ServerFunk(list, username)
  let theta = serve.getTheta()
  let distance = serve.getDistance()
  let target = serve.getTarget()
  let targetsTarget = serve.getTargetsTarget()
  let listObj =serve.getListObj()
  if(listObj[username].hireable && listObj[username].alive){
    const sql = `UPDATE players SET alive =
                  CASE username
                  WHEN ? THEN 'dead'
                  WHEN ? THEN 'true'
                  END,
                  target =
                  CASE username
                  WHEN ? THEN ?
                  WHEN ? THEN ?
                  END`

  //might need to change false on line 174
    req.query(sql, [target, username, username, targetsTarget, target, target], (err, result) => {
      if (err){
        res.status(500).json({success:false, message: "Shudda ate more of them there gator brains, they make you smart", err})

      } else { //check if timestamp is recent and if radius is small enough for a kill
        const sqlQuery = `UPDATE players SET alive =
                      CASE username
                      WHEN ? THEN 'taco'
                      END,
                      target =
                      CASE username
                      WHEN ? THEN ?
                      END`
        req.query(sql, [username, target, 'es a taco'], (err2, result) => {
          if (err){
            res.status(500).json({success: false, message: "sup dwarf", err})
          }
        })
        res.json({success: true, message: 'Take a swig of this here moonshine, and party it up, Butch', result})
      }
    })
  }
})

/**********************
redundant route       use : user/heartbeat
**********************/

// updates players location on database, gets location from front-end
app.put('/user/location', (req, res) => {
  const {latitude, longitude, username} = req.body
  const sql = `UPDATE players SET latitude = ?, longitude = ? WHERE username = ?`
  req.query(sql, [latitude, longitude, username], (err, result) => {
    if (err){
      res.status(500).json({success:false, message: "Cletus, get on outta here, you done Butched up!", err})
    } else {
      res.json({success:true, message: "You gotta not Cletus up, and get those gator legs good and tight!", result})
    }
  })
})
// timer started for wait period before a person can begin assassinating any targets.
// player can kill targets when hireable is update to true
app.put('/user/startCountDown', (req, res) => {
  const {username} = req.body
  const sql =`UPDATE players SET hireable = 'false' WHERE username = ?`
  req.query(sql, [username], (err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Now here's where the science kicks in, you done messed it up", err})
    } else {
      res.json({success:true, message: "You done wrangled that gator gud,!", result})
    }
  })
})

// sets player's hireable status to true on database when timer ends. player can then kill targets
app.put('/user/hireable', (req, res) => {
  const {username} = req.body
  const sql = `UPDATE players SET hireable = 'true' WHERE username = ?`
  req.query(sql, [username], (err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Quit ridin' that sow like a horse Cletus!", err})
    } else {
      res.json({success:true, message: "Cletus is the world champion sow rider in the lower 52", result})
    }
  })
})

/************************
redundant route        use : user/startcountdount, maybe rename to make sense for both routes
************************/

//player logs out of game.
app.put('user/logout', (req, res) => {
  const {username} = req.body
  //if lastUpdated is greater than two hours then set automatically to logged out
  const sql = `UPDATE players SET hireable = 'false' WHERE username = ?`
  req.query(sql, [username], (err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Cletus, leave that poor scarecrow alone, now!", err})
    } else {
      res.json({success:true, message: "Weeehooo! That there is some good shooting, Cletus. That scarecrow aint even seen that comin!", result})
    }
  })
})


/************************
redundant route         use : user/kill/
************************/

// sets player alive status to false, this is already updated in the route user/kill/
// app.post('/bringOutYerDead', (req, res) => {
//   const sql = `SELECT * FROM players WHERE alive = 'dead'`
//   req.query(sql, [username], (err, result) => {
//     if(err){
//       res.status(500).json({success:false, message: "Here lies Butch, worst darned gator wrastler both sides of the Mississippi", err})
//     } else {
//       res.json({success:true, message: "Cletus done got that there Gator that kill't his best buddy Butch", result})
//     }
//   })
// })

app.post('/bringOutYerDead', (req, res) => {
  const {roomCode, username} = req.body;
  const sql = `SELECT * from playersToGames where roomCode = ?`
  req.query(sql, [roomCode], (err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Here lies Butch, worst darned gator wrastler both sides of the Mississippi", err})
    } else {
      const sql2 = `SELECT * FROM players WHERE alive = 'dead'`
      req.query(sql2, [roomCode], (err2, result2) => {
        if(err){
          res.status(500).json({success:false, message: "I'm not dead"})
        } else {
          console.log("result ", result)
          console.log("result2 ", result2)
          let serve = new ServerFunk(result2, username)
          let listObj = serve.getListObj()
          let listArr = serve.getListArr()
          console.log("listObj from players", listObj)
          console.log("listArr form players", listArr)
          let people = result.slice()
          let deadPeopleObj = {}
          let deadPeopleArr = []
          people.forEach(obj => {
            user = obj.username
            if(listObj[user]){
              deadPeopleObj[user] = listObj[user]
            }
          })
          console.log("GET OUT OF HERE GHOSTS! obj", deadPeopleObj )
          deadPeopleArr = Object.values(deadPeopleObj)
          console.log("ALLLLLL THE DEADS", deadPeopleArr)
          deadPeopleArr.map(val => val = val.username)
          console.log("ALLLLLL THE DEADS 2.0", deadPeopleArr)
          return res.json({
                          success:true,
                          message: "here ye be dead",
                          deadPeopleArr })
        }
      })
    }
  })
  })
/************************
redundant route        use : user/kill/:roomCode
************************/

// selects all players in a spceific room, already existing route called user/list/:roomCode
// app.get('/RIP/:roomCode', (req, res) => {
//   let roomCode = req.params.roomCode
//   const sql = `SELECT * from playersToGames where roomCode = ?`
//   req.query(sql, [roomCode], (err, result) => {
//     if(err){
//       res.status(500).json({success:false, message:"This joke done died", err})
//     } else {
//       res.json({success:true, message: "Thank you, Cletus for learnin' me to help Uncle Jack, off the horse", result})
//     }
//   })
// })

/********************************
routes for showing table data stored in database.
primarily for testing
********************************/


// shows all data on playersToGames table in database. Primarily for testing
app.get('/showPlayersToGamesTables', (req, res) => {
  const sql = `SELECT * from playersToGames`
  req.query(sql, (err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Git on outta here", err})
    } else {
      res.json({success:true, message: "MMM-hmmm, this here gator moonshine is da best in de bayou", result})
    }
  })
})

// shows all data on Games table in database. Primarily for testing
app.get('/showGamesTables', (req, res) => {
  const sql = `SELECT * from GAMES`
  req.query(sql,(err, result) => {
    if(err){
      res.status(500).json({success:false, message: "Get away from that horse!!!", err})
    } else {
      res.json({success:true, message: "Weeee-ooooo, git them glators, Cletus!", result})
    }
  })
})

// shows all data on players table in database. Primarily for testing
app.get('/showPlayersTables', (req, res) => {
  const sql = `SELECT * from players`
  req.query(sql,(err, result) => {
    if(err){
      res.status(500).json({success:false, message: "errrrrrrror", err})
    } else {
      res.json({success:true, message: "clever message, Butch", result})
    }
  })
})

app.listen(port)
console.log("The server is working on Port", port)
