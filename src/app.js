const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { hasSubscribers } = require('diagnostics_channel')
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')
const app = express()
const port = process.env.PORT || 3000
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// define path for express config 
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// setip handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to serve
app.use(express.static(publicDirectorypath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Utkarsh Koshta'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
       title: 'About Me',
       name: 'Utkarsh Koshta' 
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Utkarsh Koshta',
        helpText: 'This is Some helpful text'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Utkarsh'
//     },
//     {
//         name: 'Sumit'
//     }
// ])
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        
    })
})      
app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term '
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Utkars Koshta',
        errorMessage: 'Page Not Found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
}) 