const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=513da0e994fad64af2960c17edb08d30&query=" + latitude + "," + longitude
    console.log("URL:"+url)
    request({url:url, json:true}, (error,response) => {

        if(error){
            callback("Unable to connect !!", undefined)
        }  else if(response.body.error){
            callback("Unable to find location", undefined)
            }
          else {
              const forecast = "The temperature is " + response.body.current.temperature + " degree celcius , However it feels like "+ response.body.current.feelslike + " degree celcius , Humidity is : "+  response.body.current.humidity 
            callback(undefined, forecast)
        }
    })


}

module.exports = forecast
  

 