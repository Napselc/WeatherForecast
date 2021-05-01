const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibmFwc2VsYyIsImEiOiJja25yMXZtNzIwYW9jMndudHc4YzVsMHM4In0.kk2zRSD5we8A3X5vtBU4yg&limit=1"
    console.log(url)
     request({url:url, json:true}, (error, response) => {
            
            if(error){
                callback("Unable to connect", undefined)
            } else if(response.body.features.length ===0 ) {
                callback("Unable to get location", undefined)
            } else {
                callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })
            }
         })
}

module.exports = geocode
