const mysql = require('mysql')



class DBFunk{
  constructor(){
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: "",
      database: "assassins"

    })
  }

  connectToDB(req, res, next){
    req.query = this.connection.query.bind(this.connection)
    next()
  }


  joinTable(roomCode){
    this.connection.connect((error) => {
      if(error)console.error("0 to hero. Just like Tim", error)
      let sql = `SELECT players.*, games.*
                    FROM player
                    JOIN collective ON collective.players = players.username
                    JOIN games ON PlayersToGames.games = games.roomCode`
      this.connection.query(sql, (error, result) => {
        if(error)console.error("You're killing me smalls!")
        console.log("Lobsters are immortal!", result)
      })
    })
  }


  updateLifeStatus(userData, roomCode){
    this.connection.connect((error) => {
      if(error) console.log("Oopsie-daisy", error )
      let sql = "UPDATE players SET isAlive = 'false' WHERE username = '" + userData.username + "'"
            this.connection.query(sql, (error, result) => {
        if(error) console.error(error)
        console.log("The fallen tributes:", userData.username)
      })
    })
  }
  addPlayer(userData, roomCode){
    this.connection.connect((error) => {
      if(error)console.error("Oopsie-doopsy, we muffed it again", error)
      let sql = `INSERT INTO players
                (username, password, longitude, latitude, alive, target, targetStatus, timeStamp)
                VALUES
                ( ?,?,?,?, 'true', NULL, NULL, NULL)`
      this.connection.query(sql, [userData.username, userData.password, userData.longitude,userData.latitude], (error, result) => {
        if(error) console.error("Crap, guys!", error)
        console.log("Lock and load, gents", userData.username, "has joined the game")
      })
    })
  }
  assignTargets(userDataList, roomCode){
    this.connection.connect((error) => {
      if(error)console.error("F$%&", error)
      let userDataArr = Object.keys(userDataList).map(key => key = userDateList.key)
      for(var i = 0; i < userDataArr.length; i++){
          let person = (userDataArr[i - 1] == "undefined" ?
          userDataArr[userDataArr.length].username : userDataArr[i - 1].username)
      let sql = `INSERT INTO players
                  (username, longitude, latitude, alive, target, targetStatus)
                  VALUES
                  ( ?, ?, ?, 'true', ?, 'true')`
        this.connection.query(sql, [userDataArr[i].username, userDataArr[i].longitude, userDataArr[i].latitude, person], (error, result) => {
          if(error)console.error("Frick on a stick with a brick", error)
          console.log("Noone is safe, the sticks have come", result)
        })
      }
    })
  }

  targetStatus(userDataList, userData, roomCode){
    this.connection.connect((error) => {
      if(error)console.error("Trolls in the basement!  Thought you'd like to know", error)
      let sql = "UPDATE players SET targetStatus = ? WHERE username = ?"
        this.connection.query(sql,[!userDataList[userData.target].isAlive, userData.username], (error, result) => {
          if(error)console.error("Eat slugs!", error)
          console.log("Voldemort is dead", result)
        })
    })
  }

  updateLocation(userDataList, longitude, latitude, roomCode){
    this.connection.connect((error) => {
      if(error)console.error("Insert an Austin pun!", error)
      let sql = "UPDATE players SET longitude = ? , latitude = ? WHERE username = ?"
        this.connection.query(sql, [userData.longitude, userData.latitude, userData.username], (error, result) => {
          if(error)console.error("Punny or die", error)
          console.log("Brother, where art thou?", result)
        })

    })
  }

  updateTimeStamp(userData, timeStamp){
    this.connection.connect((error) => {
      if(error)console.error("Man, this is really hard", error)
      let sql = "UPDATE players SET timeStamp = ? WHERE username = ?"
        this.connection.query(sql, [userData.timeStamp, userData.username],(error, result) => {
          if(error)console.error("That's what she said", error)
          console.log("Haha", result)

        })
    })
  }
  deletePlayer(userData, roomCode){
    this.connection.connect((error) => {
      if(error)console.error("Could be worse.", error)
      let sql = "DELETE from players \n \
                (username, password, longitude, latitude, alive, target, targetStatus, timeStamp) WHERE username = ? "
        this.connection.query(sql,[userData.username], (error, result) => {
          if(error)console.error("You just can't seem to do anything right, can you?", error)
          console.log("Hope you had fun", result)
        })
    })
  }







}

module.exports = DBFunk
