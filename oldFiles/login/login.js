const mysql = require('mysql')
const geo = require('../geo/geolocation')

export default class Login{
  constructor(){
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: "eltimo",//'wubbaLubbaDubDub' // admin password eltimo
      database: "assDB"
    })
  }

// ---------------------------------------------------------------------
// needed for intial database creation
//----------------------------------------------------------------------

/*
connection.connect( (error) =>{
if(error) {
  console.log("eror", error)
}
  console.log("Wubba lubba dub dub!!!!!!!")
  connection.query("CREATE DATABASE assDB", (error, result) => {
    if(error) {
      console.log("error ", error)
    }
    console.log("Database created: ", result)
  })
})
*/

  this.connection.connect( (error) =>{
    let self = this
  if(error) {
    console.log("eror", error)
  }
    console.log("Wubba lubba dub dub!!!!!!!")
    let sql = "CREATE TABLE players \n \
              ( \n \
               id INT unsigned NOT NULL AUTO_INCREMENT, \n \
               name VARCHAR(255) NOT NULL, \n \
               longitude VARCHAR(255) NOT NULL, \n \
               latitude VARCHAR(255) NOT NULL, \n \
               alive VARCHAR(5) NOT NULL, \n \
               target VARCHAR(100) NOT NULL, \n \
               PRIMARY KEY (id) \n \
             );\n"
    self.connection.query(sql, (error, result) => {
      if(error) {
        console.log("error ", error)
      }
      console.log("table created: ", result)
    })
    let newPlayer = "('Rick', '0', '0', 'true', 'morty')"
    let tableCol = "INSERT INTO players (name, longitude, latitude, alive, target) VALUES" + newPlayer + ";"
    self.connection.query(tableCol, (err, result) => {
      if(err){
        console.log("ERRROROROR ", err)
      }
      console.log("Added player ", result)
    })
  })

 updateLocation()  {
    let obj = geo.sendData()

    this.connection.connect( error =>{
      if (err) console.log(err)

      let update = "UPDATE players set longitude = " + "'" + obj.longitude + "'" + " where name = 'Rick'"

      this.connection.query(update, (err,result) => {
        if (err) console.log(err)
        console.log("update player ", result)
      })
    })
  }
  this.updateLocation()
}
