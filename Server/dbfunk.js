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
}
module.exports = DBFunk
