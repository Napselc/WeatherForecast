const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const publicDirectoryPath = path.join(__dirname,"../public")
const partialsPath = path.join(__dirname,"../partials")

const app = express()
const port = process.env.port || 3000
app.set("view engine", "hbs") // setting up the handlenbars template engine
//const viewsPath = path.join(__dirname, "../templates")
//app.set("views", viewsPath)           --> if the name "views" is to be changed

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath)) // setup static directory


app.get("", (req, res) => {

    res.render("index", {    // no need to give extension .hbs
        title: "Home Page",
        name: "Abhishek"
    })

})

app.get("/weather", (req, res) => {
    
     if(!req.query.address){
          return res.send({
            error:"Please provide an address !!"
        })
    }
      geocode(req.query.address, (error, data= {}) => {

        if(error){
            return res.send({error:error})
        }
    
        forecast(data.latitude, data.longitude, (error,forecastData) => {
    
         if(error){
           return res.send({error:error})
         }
     
         res.send({
            location:data.location,
            forecast:forecastData,
         })
          
      })
   })     

})

app.get("/about", (req, res) => {

    res.render("about", {
        title: "About Page",
        name: "Abhishek"
    })

})


 
app.get("/help", (req, res) => {

    res.render("help", {
        title: "Help Page",
        name: "Abhishek",
        helpText: "This is to help"
    })
    

})

app.get("/help/*", (rep, res) => {

    res.render("404", {
        title:"404",
        name: "Abhishek",
        errorMessage: "Help Page not found"
    })

})


// * is the wildcard , when nothing matches, use this routing
// this should be at the last and not in between as Express looks for matches inn order of definition

app.get("*", (req, res) => {

    res.render("404", {
        title:"404",
        name: "Abhishek",
        errorMessage: "Page not found"
    })
})
app.listen(port, () => {
    console.log("Server at " + port)
})