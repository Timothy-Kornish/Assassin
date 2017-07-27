const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "eltimo",//'wubbaLubbaDubDub' // admin password eltimo
  database: "assDB"
})

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



connection.connect( (error) =>{
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
  connection.query(sql, (error, result) => {
    if(error) {
      console.log("error ", error)
    }
    console.log("table created: ", result)
  })
  let newPlayer = "('Rick', '0', '0', 'true', 'morty')"
  let tableCol = "INSERT INTO players (name, longitude, latitude, alive, target) VALUES" + newPlayer + ";"
  connection.query(tableCol, (err, result) => {
    if(err){
      console.log("ERRROROROR ", err)
    }
    console.log("Added player ", result)
  })
})
