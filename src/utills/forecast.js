const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fde178ee21d6cae4db78a4539ffaa85a&query=' + latitude + ',' + longitude + '&units=f'
    request ({ url, json: true }, (error, { body }) =>{
        if (error) {
            callback('Unable to connect to weather Services', undefined)
        } else if (body.error) {
            callback('Unable to find Location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + " It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })

}
module.exports = forecast