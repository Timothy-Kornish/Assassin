const mysql = require('mysql')



export class DBfunk{
  constructor(){
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: "eltimo",
      database: "assDB"

    })
  }

  createTable(roomCode){
    this.connection.connect((error) => {
      if(error) console.log("error", error)
      let sql = "CREATE TABLE players "+ roomCode + " \n \
                ( \n \
                id INT unsigned NOT NULL AUTO_INCREMENT, \n \
                name VARCHAR(100) NOT NULL, \n \
                longitude VARCHAR(255) NOT NULL, \n \
                latitude VARCHAR(255) NOT NULL, \n \
                alive VARCHAR(5) NOT NULL, \n \
                target VARCHAR(100) NOT NULL, \n \
                targetStatus VARCHAR(4) NOT NULL, \n \
                hunter VARCHAR(100) NOT NULL, \n \
                hunterStatus VARCHAR(4) NOT NULL, \n \
                PRIMARY KEY (id) \n \
                );\n"
      this.connection.query(sql, (error, result) => {
        if(error) console.log("woops", error)
        console.log("table created: ", result)
      })

    })
  }
  updateLifeStatus(userData, roomCode){
    this.connection.connect((error) => {
      if(error) console.log("Oopsie-daisy", error )
      let sql = ""
      this.connection.query(sql, (error, result) => {
        if(error) console.error(error)
        console.log("The fallen tributes:", userData.username)
      })
    })
  }
  addPlayer(userData, roomCode){
    this.connection.connect((error) => {
      if(error)console.error("Oopsie-doopsy, we muffed it again", error)
      let sql = "INSERT INTO players" + roomCode + " \n \
                (username, longitude, latitude, alive, target, targetStatus, hunter, hunterStatus) \n \
                VALUES
                ( '",userData.username,"', '",userData.longitude, "', '",userData.latitude,"', 'true', 'undefined', 'undefined', 'undefined', 'undefined')"
      this.connection.query(sql, (error, result) => {
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

      let sql = "INSERT INTO players" + roomCode + " \n \
                  (username, longitude, latitude, alive, target, targetStatus, hunter, hunterStatus) \n \
                  VALUES
                  ( '",userDataArr[i].username,"', '",userDataArr[i].longitude, "', '",userDataArr[i].latitude,"', 'true', '",userDataArr[i - 1].username, "',true', '",userDataArr[i + 1].username,"', 'true')"
        this.connection.query(sql, (error, result) => {
          if(error)console.error("Frick on a stick with a brick", error)
          console.log("Noone is safe, the sticks have come")
        })
      }
    })
  }

  (userDataList, roomCode){
    this.connection.connect((error) => {
      if(error)console.error("Death to n00bs", error)

    })
  }

}
