const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const ServerFunk = require('./server_funcs')

const app = express()
const players = []

const port = process.env.PORT || 3001;
const Database = require('./dbfunk')
const db = new Database()
const users = {}
const codeGen = () => {
  const codeVal = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let val = ""
  for (var i = 0; i < 4; i++){
    val += codeVal[Math.floor(Math.random()* 36)]
  }
  return val
}
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

const organizer = (arr) => {
	for(var i = 0; i < arr.length; i++){
		arr[i]  = arr[i].username
	}
  return arr
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(db.connectToDB.bind(db))
app.use(express.static(path.join(__dirname, '..', 'build')))


app.set('superSecret', "secretTUNNELthroughTHEmountain");

app.post('/signup', (req, res) => {
  const {username, password} = req.body
  const userQuery = `SELECT * FROM players WHERE username = ?`

  req.query(userQuery, [username], (err, result) => {
    console.log("error in select * ",err)
    console.log("result is ",result)
    if(err){
      console.log(err)
      throw err
    }
    if(!result[0]) {
      const sql = `INSERT INTO players (username, password)  VALUES (?, ?);`
      req.query(sql, [username, password], (err, result) => {
        if(err){
          res.status(500).json({message: 'Da database done broke, cuz', err})
        } else {
          var token = jwt.sign({username}, app.get('superSecret'), {
            expiresIn: "2days"
          });
          res.json({sucess: "well done, butch!", result, token})
        }
      })
    } else if(result[0]){
      res.status(500).json({message: 'That there user already exists hog'})
    }
  })
  //======================================
  //This should be done on a sign up route not on login
  //This errors out when user already exists in DB

  //TODO: Change to a sign up route and hash the password before storing it


  //======================================

  })

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
        res.json({success: false, message: 'user not found'})
      } else if(result[0]) {

        req.query(passQuery, [username], (err, result) => {
          if(err){
            console.log(err)
            throw err
          }

          //TODO: check the hashed value of the stored pwd against sent hash
          if(result[0].password !== password) {
            console.log(result[0].password)
            res.json({success: false, message: 'password not found'})
          } else if(result[0].password === password) {
            var token = jwt.sign({username}, app.get('superSecret'), {
              expiresIn: "2days"
            });

            res.json({success: true, message: "you're in", token })
          } else {
            res.json({message: "something went very wrong"})
          }
        })
      }

    })
  })

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


  app.post('/joinTables', (req, res) => {
    let sql = `SELECT players.*, games.*
                  FROM players
                  JOIN PlayersToGames ON PlayersToGames.username = players.username
                  JOIN games ON PlayersToGames.roomCode = games.roomCode`
    req.query(sql, (err, result) => {
      if(err){
        res.status(500).json({message: "Quit drinkin all of meemaws good moonshine!", err})
      } else {
        res.json({success: "Don't forget the flashlight on yer way to the john, Butch!", result})
      }
    })
  })

app.post('/room', (req, res) => {
  const {roomCode} = req.body
  const code = codeGen()
  const sql = `INSERT INTO games (roomCode, active) VALUES (?, ?)`

  req.query(sql, [roomCode, 0], (err, result) => {
    if(err){
      res.status(500).json({message: "Fix the damn ac, JSON! C'mon now!", err})
    }else {
      res.json({success: "Y'all nu' gunna die today, Butch!", result})
    }
  })
})

app.put('/room/admin', (req, res) => {
  const {roomCode, username} = req.body
  const sql = `UPDATE playersToGames SET admin = 'true' WHERE username = ?`
  req.query(sql, [username], (err, result) => {
    if(err){
      res.status(500).json({message: "Gator got yer arm, Butch!", err})
    } else {
      res.json({success: 'Poke that Gators eye, Cletus!', result})
    }
  })
})

app.put('/room/add',(req, res) => {
  const {username, roomCode} = req.body
  console.log(username, roomCode)
  const sql = `INSERT INTO PlayersToGames
                (roomCode, username)
                VALUES (?,?);`
  req.query(sql, [roomCode, username], (err, result) =>{
    if (err){
      res.status(500).json({message: 'Database Error', error: err})
    } else {
      res.json({success: 'ye-ah', result})
    }
  })
})

app.put('/room/start', (req, res) => {
  const {roomCode} = req.body
  const sql = ` UPDATE players, games SET alive = 'true', active = 1 WHERE roomCode = ?`
  req.query(sql, [roomCode], (err, result) => {
    if (err){
      res.status(500).json({message: "Imma feed you to da gators, Butch!", err})
    }else{
      res.json({success: 'Eeeeeeeeeeeiii', result})
    }
  })
})

app.put('/user/targets', (req, res) => {
  const {roomCode} = req.body
  const sql = `SELECT username, admin FROM playersToGames
              WHERE roomCode = ?`
  req.query(sql, [roomCode], (err, result) => {
    if(err){
      res.status(500).json({message: 'Ma, get out here, that Gator dun eat Butch!', err})
    }else{
      res.json({success: 'Ma, get out here, Butch dun eat that Gator!', result})
    }
  })
})


app.put('/user/targets/assign', (req, res) => {
  let {result} = req.body
  console.log(result)
  result = organizer(result)
  result = shuffle(result)
  let sql = SQLgen(result)
  console.log(result)
  req.query(sql, (err, answer) => {
    if(err){
      res.status(500).json({message: "Pa, there's a damn armadill in the house!", err})
    } else {
      res.json({success: "Ma, this here armadill pie is de best you ever made", answer})
    }
  })

})





app.put('/user/heartbeat', (req, res) => {
  const {username, time, latitude, longitude} = req.body
  const sql = `UPDATE players SET lastUpdated = ?, latitude = ?, longitude = ? WHERE username = ?`
  req.query(sql, [time, latitude, longitude, username], (err, result) => {
    if(err){
      res.status(500).json({message: "Cletus, stop peein on Butch's practicing tree!", err})
    } else {
      res.json({success: "This here tree is the happiest darned tree in Louisiana!", result})
    }
  })
})

//user heartbeat
app.get('/user/game/data/:username', (req, res) => {
  let username = req.params.username
  let sql = `SELECT * FROM players`
  req.query(sql, (err, result) => {
     let serve = new ServerFunk(result,username)
     let theta = serve.getTheta()
     let distance = serve.getDistance()
     let target = serve.getTarget()
     let targetsTarget = serve.getTargetsTarget()
     let listObj = serve.getListObj()

    if(err) {
      res.status(500).json({message:"I'm Daniel Boon, checkout my coon hat", err})
    }
    else {
      res.json({success: "sup Daniel Boon", result, theta, distance, target, targetsTarget, listObj})
    }
  })
})


app.get('/user/list/:roomCode', (req, res) => {
  const roomCode = req.params.roomCode
  const sql = `SELECT username, admin FROM playersToGames WHERE roomCode = ?`
  req.query(sql,[roomCode],(err, result) => {
    if(err){
      res.status(500).json({message: "Butch, go help yer Uncle!", err})
    } else {

      let creator = ""
      targets = result.slice()
      result.forEach(val => {
        if (val.admin == 'true'){
          creator = val.username
        }
      })
      let players = organizer(result)

      res.json({success: "That horse needs help, Cletus", targets, players: players, creator: creator})
    }
  })
})

app.post('/user/kill', (req, res) => {
  const {list, username} = req.body
  let serve = new ServerFunk(list, username)
  let theta = serve.getTheta()
  let distance = serve.getDistance()
  let target = serve.getTarget()
  let targetsTarget = serve.getTargetsTarget()

  if(distance > 50){
    res.json({message: "You are out of range", distance})
  }
  else {
    const sql = `UPDATE players SET alive =
                  CASE username
                  WHEN ? THEN 'false'
                  END,
                  target =
                  CASE username
                  WHEN ? THEN ?
                  END`
  //might need to change false on line 174
    req.query(sql, [target, username, targetsTarget], (err, result) => {
      if (err){
        res.status(500).json({message: "Shudda ate more of them there gator brains, they make you smart", err})

      } else { //check if timestamp is recent and if radius is small enough for a kill
        res.json({success: 'Take a swig of this here moonshine, and party it up, Butch', result})
      }
    })
  }
})

app.put('/user/location', (req, res) => {
  const {latitude, longitude, username} = req.body
  const sql = `UPDATE players SET latitude = ?, longitude = ? WHERE username = ?`
  req.query(sql, [latitude, longitude, username], (err, result) => {
    if (err){
      res.status(500).json({message: "Cletus, get on outta here, you done Butched up!", err})
    } else {
      res.json({success: "You gotta not Cletus up, and get those gator legs good and tight!", result})
    }
  })
})

app.put('/user/startCountDown', (req, res) => {
  const {username} = req.body
  const sql =`UPDATE players SET hireable = 'false' WHERE username = ?`
  req.query(sql, [username], (err, result) => {
    if(err){
      res.status(500).json({message: "Now here's where the science kicks in, you done messed it up", err})
    } else {
      res.json({success: "You done wrangled that gator gud,!", result})
    }
  })
})


app.put('/user/hireable', (req, res) => {
  const {username} = req.body
  const sql = `UPDATE players SET hireable = 'true' WHERE username = ?`
  req.query(sql, [username], (err, result) => {
    if(err){
      res.status(500).json({message: "Quit ridin' that sow like a horse Cletus!", err})
    } else {
      res.json({success: "Cletus is the world champion sow rider in the lower 52", result})
    }
  })
})

app.put('user/logout', (req, res) => {
  const {username} = req.body
  //if lastUpdated is greater than two hours then set automatically to logged out
  const sql = `UPDATE players SET hireable = 'false' WHERE username = ?`
  req.query(sql, [username], (err, result) => {
    if(err){
      res.status(500).json({message: "Cletus, leave that poor scarecrow alone, now!", err})
    } else {
      res.json({success: "Weeehooo! That there is some good shooting, Cletus. That scarecrow aint even seen that comin!", result})
    }
  })
})

app.put('/bringOutYerDead', (req, res) => {
  const {roomCode} = req.body
  const sql = `UPDATE players SET alive = 'false' WHEN username = ?`
  req.query(sql, [username], (err, result) => {
    if(err){
      res.status(500).json({message: "Here lies Butch, worst darned gator wrastler both sides of the Mississippi", err})
    } else {
      res.json({success: "Cletus done got that there Gator that kill't his best buddy Butch", success})
    }
  })
})


app.get('/showPlayersToGamesTables', (req, res) => {
  const sql = `SELECT * from playersToGames`
  req.query(sql, (err, result) => {
    if(err){
      res.status(500).json({message: "Git on outta here", err})
    } else {
      res.json({success: "MMM-hmmm, this here gator dick moonshine is da best in de bayou", result})
    }
  })
})

app.get('/showGamesTables', (req, res) => {
  const sql = `SELECT * from GAMES`
  req.query(sql,(err, result) => {
    if(err){
      res.status(500).json({message: "Get away from that horse!!!", err})
    } else {
      res.json({success: "Weeee-ooooo, git them glators, Cletus!", result})
    }
  })
})

app.get('/showPlayersTables', (req, res) => {
  const sql = `SELECT * from players`
  req.query(sql,(err, result) => {
    if(err){
      res.status(500).json({message: "errrrrrrror", err})
    } else {
      res.json({success: "clever message, Butch", result})
    }
  })
})



app.listen(port)
console.log("The server is working on Port", port)
