const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=513da0e994fad64af2960c17edb08d30&query=" + latitude + "," + longitude
    console.log(url)
    request({url:url, json:true}, (error,response) => {

        if(error){
            callback("Unable to connect !!", undefined)
        }  else if(response.body.error){
            callback("Unable to find location", undefined)
            }
          else {
            callback(undefined, "The temperature is " + response.body.current.temperature + " , however it feels like "+ response.body.current.feelslike)
        }
    })


}

module.exports = forecast
  

 