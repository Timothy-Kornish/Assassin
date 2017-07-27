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
  let sql = "CREATE TABLE players (name VARCHAR(255), address VARCHAR(255))"
  connection.query(sql, (error, result) => {
    if(error) {
      console.log("error ", error)
    }
    console.log("table created: ", result)
  })
  let rick = "('Rick','eltomo', 'morty')"
  let tableCol = "INSERT INTO players (name, owner, birth) VALUES" + rick
  connection.query(tableCol, (err, result) => {
    if(err){
      throw err
    }
    console.log("connected to ", result)
  })
})
