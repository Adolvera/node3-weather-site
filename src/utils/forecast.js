const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3cd2030ec78ba0e3fb317c101036fb20&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body }) => {
      if(error) {
        callback('Unable to connect to weather services');
      } else if (body.error) {
        callback('Unable to find location');
      } else {
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out but it feels like ' + body.current.feelslike + ' degrees');
      }
    })
}

module.exports = forecast;