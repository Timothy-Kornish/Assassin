const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')

const app = express()

const port = process.env.PORT || 3001;

const users = {}
const codeGen = () => {
  const codeVal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let val = ""
  for (var i = 0; i < 4; i++){
    val[i] = codeVal[Math.floor(Math.random()* 26)]
  }
  return val
}

app.use(express.static(path.join(__dirname, '..', 'build')))

//loginPage.js
app.post('/login', (req, res) => {
  const {username, password} = req.body

})

//loginPage.js
app.post('/userNew', (req, res) => {
  const {username, password} =req.body
})

//lobby.js
app.post('/room', (req, res) => {
  const {latitude, longitude, username} = req.body
  const code = codeGen()
  res.json({roomCode: code})
})

//login.js
app.put('/room/add',(req, res) => {
  const {username, roomCode} = req.body
})


app.route('/room/:roomCode')
    .get((req, res) => {
  //grab players from mysql database

    })
    .delete((req, res) => {

    })

//loading.js
app.put('/room/start', (req, res) => {
  const {roomCode} = req.body
  //get the target and begin the game
} )

//game.js
app.post('/user/kill', (req, res) => {
  const {latitude, longitude} = req.body
})

//game.js
app.put('/user/location', (req, res) => {
  const {latitude, longitude} = req.body
  res.json({})
})

//loginPage.js
app.put('/user/startCountDown', (req, res) => {
  res.json({})
})

//on all pages in frontEnd
app.put('/logout', (req, res) =>{
  const {username} = req.body
})







app.listen(port)
console.log("The server is working on Port", port)
