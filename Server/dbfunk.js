const mysql = require('mysql')

const herokuDB = {
  connectionLimit: 10,
  user: 'b558bcccc8e41b',
  password:' adc4a96b',
  host: 'us-cdbr-iron-east-05.cleardb.net'
  database: 'heroku_4c0523db0ad7e12'
}

const localDB = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: "",
  database: "assassins"
}

const db = process.env.CLEARDB_DATABASE_URL ? herokuDB : localDB;

class DBFunk{
  constructor(){
    this.connection = mysql.createPool(db)
  }

  connectToDB(req, res, next){
    req.query = this.connection.query.bind(this.connection)
    next()
  }
}
module.exports = DBFunk
