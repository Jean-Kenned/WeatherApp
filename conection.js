const mysql = require('mysql')

const conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "weather_app"
});

conection.connect(function (err) {
  if (err) throw err
})


module.exports = conection
