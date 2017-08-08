const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(db.connectToDB.bind(db))
app.use(express.static(path.join(__dirname, '..', 'build')))

app.post('/login', (req, res) => {
  const {username, password} = req.body
  const sql = `INSERT INTO players (username, password)  VALUES (?, ?);`
  req.query(sql, [username, password], (err, result) => {
    if(err){
      res.status(500).json({message: 'Da database done broke, cuz', err})
    } else {
      res.json({sucess: "well done, butch!", result})
    }
    })
  })

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
  const {roomCode, username} = req.body
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
  const sql = `UPDATE games SET active = 1 WHERE roomCode = ?`
  req.query(sql, [roomCode], (err, result) => {
    if (err){
      res.status(500).json({message: "Imma feed you to da gators, Butch!", err})
    }else{
      res.json({success: 'Eeeeeeeeeeeiii', result})
    }
  })
})

app.post('/user/targets', (req, res) => {
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

app.post('/user/kill', (req, res) => {
  const {target, username, targetsTarget} = req.body
  const sql = `UPDATE players SET alive =
                CASE username
                WHEN ? THEN 'false'
                END,
                targetStatus =
                CASE username
                WHEN ? THEN 'false'
                END,
                target =
                CASE username
                WHEN ? THEN ?
                END`
//might need to change false on line 174
  req.query(sql, [target, username, username, targetsTarget], (err, result) => {
    if (err){
      res.status(500).json({message: "Shudda ate more of them there gator brains, they make you smart", err})
    }else {
      res.json({success: 'Take a swig of this here moonshine, and party it up, Butch', result})
    }
  })
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

app.put('/logout', (req, res) => {
  const {roomCode, username} = req.body
  const sql = `UPDATE players SET alive = 'out' WHERE username  = ? AND roomCode = ?`
  req.query(sql, [username, roomCode], (err, result) => {
    if(err){
      res.status(500).json({message: "errrrrrrror", err})
    } else {
      res.redirect('/lobby').json({success: "clever message, Butch", result})
    }
  })

})

// app.get('/user/timeTest', (req, res) => {
//   const sql =`Select lastUpdated from players `
//     req.query(sql, (err, result) => {
//       if(err){
//         res.status(500).json({message: "gator got ye", err})
//       } else {
//           const timeLast = result[0].lastUpdated.getTime()
//           console.log(timeLast)
//           const timeNow = new Date().getTime()
//           console.log(timeNow)
//           const timeDiff = (Math.floor((timeNow - timeLast)/1000)/60).toFixed(2)
//           console.log(timeDiff)
//         res.json({success: "Yeehaw, that gator got got!"})
//
//       }
//     })
// })

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
      res.status(500).json({message: "Gator dun got ye, Cletus!", err})
    } else {
      res.json({success: "Yeehaw, Butch!  Them gator steaks are gooood eatin!", result})
    }
  })
})

app.listen(port)
console.log("The server is working on Port", port)
