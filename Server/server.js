const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3001;
const Database = require('./dbfunk')
const db = new Database()
const users = {}
const codeGen = () => {
  const codeVal = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let val = ""
  for (var i = 0; i < 4; i++){
    val[i] = codeVal[Math.floor(Math.random()* 36)]
  }
  return val
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(db.connectToDB.bind(db))
app.use(express.static(path.join(__dirname, '..', 'build')))

app.post('/login', (req, res) => {
  const {username, password, hireable} = req.body
  const sql = `INSERT INTO players
                (username, password, hireable)
                VALUES (?, ?, ?);`
  req.query(sql, [username, password, hireable], (err, result) => {
    if(err){
      res.status(500).json({message: 'Da database done broke, cuz', err})
    } else {
      res.json({sucess: "well done, butch!"})
    }
    })
  })

app.post('/user', (req, res) => {
  const {username, password} =req.body

})

app.post('/room', (req, res) => {
  const {latitude, longitude, username, roomCode} = req.body
  const code = codeGen()
  const sql = `INSERT INTO games
              (roomCode, active)
              VALUES (?, ?);`
  req.query(sql, [roomCode, 0], (err, result) => {
    if(err){
      res.status(500).json({message: "Fix the damn ac, JSON! C'mon now!", err})
    }else {
      res.json({success: "Y'all nu' gunna die today, butch!"})
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
      res.json({success: 'ye-ah'})
    }
  })
})

app.route('/room/:roomCode')
    .get((req, res) => {
      const sql = `SELECT * from games`
      req.query(sql, (err, result) => {
        if(err){
          res.status(500).json({message: 'Waaaa-waaa', err})
        }else {
          res.json({success: "woopwoopwoopwoop!"})
        }
      })


    })
    .delete((req, res) => {
      const sql = `UPDATE games
                  (roomCode, active)
                  VALUES (?, ?);`

    })

app.put('/room/start', (req, res) => {
  const {roomCode} = req.body
  const sql = `UPDATE games
              (active)
              VALUES(1);`
  req.query(sql, (err, result) => {
    if err{
      req.status(500).json({message: "Imma feed you to da gators, butch!", err})
    }else{
      res.json({success: 'Eeeeeeeeeeeiii'})
    }
  })
})

app.post('/user/kill', (req, res) => {
  const {latitude, longitude} = req.body
  const sql = `UPDATE players
                (alive)
                VALUES('false') WHERE username = ?`
  req.query(sql, [target] (err, result) => {
    if (err){
      req.status(500).json({message: "Shudda ate more of them there gator brains, they make you smart", err})
    }else {
      req.json({success: 'Take a swig of this here moonshine, and party it up, Butch'})
    }
  })
})

app.put('/user/location', (req, res) => {
  const {latitude, longitude} = req.body
  const sql `UPDATE players
            (latitude, longitude)
            VALUES(?, ?) WHERE username = ?`
  req.query(sql, [latitude, longitude, username], (err, result) => {
    if (err){
      req.status(500).json({message: "Cletus, get on outta here, you done Butched up!", err})
    } else {
      req.json({success: "You gotta not Cletus up, and get those gator legs good and tight!"})
    }
  })
})

app.put('/user/startCountDown', (req, res) => {
  const {username, hireable} = req.body
  const sql `UPDATE players
            (hireable)
            VALUES( ?) WHERE username = ?`
  req.query(sql, [hireable, username], (err, result) => {
    if(err){
      req.status(500).json({message: "Now here's where the science kicks in, you done messed it up", err})
    } else {
      req.json({success: "You done wrangled that gator gud,!"})
    }
  })
})









app.listen(port)
console.log("The server is working on Port", port)
