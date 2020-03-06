const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const operationsDB = require('./operationsDB.js')
const async = require('async')
const app = express()

const apiKey = '38004137bc9974687088514e5a6b4afd'

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  async.series([
    selectHistory,
    selectMostSearched
  ], function (err, results) {
    res.render('index', { weather: null, error: null, lastestSearches: results[0], mostSearched: results[1] })
  })

}
)

function selectHistory(callback) {
  operationsDB.selectHistorico(function (result) {
    callback(null, result)
  })

}


function selectMostSearched(callback) {
  operationsDB.selectMaisPesquisadas(function (result) {
    callback(null, result)
  })

}


app.post('/', function (req, res) {
  let city = req.body.city
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`

  request(url, function (err, response, body) {
    if (err) {
      async.series([
        selectHistory,
        selectMostSearched

      ], function (err, results) {
        res.render('index', {
          weather: null,
          lastestSearches: results[0],
          mostSearched: results[1],
          error: 'Cidade não encontrada, por favor tente novamente'
        })
      })

    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        async.series([
          selectHistory,
          selectMostSearched

        ], function (err, results) {
          res.render('index', {
            weather: null,
            lastestSearches: results[0],
            mostSearched: results[1],
            error: 'Cidade não encontrada, por favor tente novamente'
          })
        })
      } else {

        let nameCity = weather.name
        let countryCode = weather.sys.country
        let temperature = weather.main.temp
        let humidity = weather.main.humidity
        let wind = weather.wind.speed
        let description = weather.weather[0].description
        let urlIcon = ['http://openweathermap.org/img/wn/', '@2x.png']
        let iconWeather = urlIcon[0] + weather.weather[0].icon + urlIcon[1]
        let date = convertTimeStampToDate(weather.dt, weather.timezone)


        let rowToHistorico = [
          nameCity,
          countryCode,
          temperature,
          description
        ]

        let rowToMaisPesquisadas = [
          weather.id,
          nameCity,
          countryCode,
        ]

        operationsDB.insertIntoHistorico(rowToHistorico)
        operationsDB.insertIntoMaisPesquisadas(rowToMaisPesquisadas)


        async.series([
          selectHistory,
          selectMostSearched

        ], function (err, results) {
          res.render('index', {
            weather: weather,
            city: nameCity,
            country: countryCode,
            temperature: temperature,
            humidity: humidity,
            wind: wind,
            description: description,
            icon: iconWeather,
            date: date,
            lastestSearches: results[0],
            mostSearched: results[1],
            error: null
          })
        })
      }
    }
  })
})

app.listen(3000, function () {
  console.log('Escutando requisições na porta 3000')
})

const convertTimeStampToDate = (timestamp, timezone) => {
  let months_arr = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  let seconds = timestamp + timezone

  let date = new Date(seconds * 1000)
  let month = months_arr[date.getUTCMonth()]
  let day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()
  let formattedDate = day + '/' + month
  let hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()
  let minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()
  let formattedTime = hours + ':' + minutes

  let dateString = formattedDate + ', ' + formattedTime
  return dateString
}