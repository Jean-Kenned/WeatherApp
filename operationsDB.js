const conection = require('./conection.js')

const insertIntoHistorico = (row) => {
  const sql = 'INSERT INTO historico (name, country, temperature, description) VALUES (?)'

  try {
    conection.query(sql, [row], function (err, results) {
    })
  } catch (err) {
    console.log(err)
  }
}

const insertIntoMaisPesquisadas = (row) => {
  let [id, name, country] = row

  const sqlSelect = 'SELECT * from maispesquisadas WHERE id= ?'
  const sqlInsert = 'INSERT INTO maispesquisadas (id, name, country, num_pesquisas) VALUES (?)'
  const sqlUpdate = 'UPDATE maispesquisadas SET num_pesquisas = ? WHERE id= ?'

  try {

    conection.query(sqlSelect, id, function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        conection.query(sqlInsert, [[id, name, country, 1]], function (err, results) {
          if (err) throw err
        })
      } else {
        let data = [++result[0].num_pesquisas, id]
        conection.query(sqlUpdate, data, function (err, results) {
          if (err) throw err
        })

      }
    })

  } catch (err) {
    console.log(err)
  }

}

function selectHistorico(callback) {
  const sqlSelect = 'SELECT * from historico ORDER BY id DESC LIMIT 5'
  const retorno = []
  conection.query(sqlSelect, function (err, results) {
    results.forEach(element => {
      let time = element.created_at.toString();
      let timeinParts = time.split(" ")
      let timeString = timeinParts[2] + " " + timeinParts[1] + ' às ' + timeinParts[4]
      retorno.push({ ...element, date: timeString })
    });

    return callback(retorno)
  })

}

function selectMaisPesquisadas(callback) {
  const sqlSelect = 'SELECT * from maispesquisadas ORDER BY num_pesquisas DESC LIMIT 5'
  conection.query(sqlSelect, function (err, results) {
    return callback(results)
  })

}

module.exports = {
  insertIntoHistorico,
  insertIntoMaisPesquisadas,
  selectHistorico,
  selectMaisPesquisadas
}