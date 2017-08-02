const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')

const app = express()

const port = process.env.PORT || 3001;

const users = {}
const codeGen = () => {
  const codeVal = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let val = ""
  for (var i = 0; i < 4; i++){
    val[i] = codeVal[Math.floor(Math.random()* 36)]
  }
  return val
}

app.use(express.static(path.join(__dirname, '..', 'build')))

app.post('/login', (req, res) => {
  const {username, password} = req.body

})

app.post('/user', (req, res) => {
  const {username, password} =req.body
})

app.post('/room', (req, res) => {
  const {latitude, longitude, username} = req.body
  const code = codeGen()
  res.json({roomCode: code})
})

app.put('/room/add',(req, res) => {
  const {username, roomCode} = req.body
})

app.route('/room/:roomCode')
    .get((req, res) => {
  //grab players from mysql database

    })
    .delete((req, res) => {

    })

app.put('/room/start', (req, res) => {
  const {roomCode} = req.body
  //get the target and begin the game
} )

app.post('/user/kill', (req, res) => {
  const {latitude, longitude} = req.body
})

app.put('/user/location', (req, res) => {
  const {latitude, longitude} = req.body
  res.json({})
})

app.put('/user/startCountDown', (req, res) => {
  res.json({})
})









app.listen(port)
console.log("The server is working on Port", port)
