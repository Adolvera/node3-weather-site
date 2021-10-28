const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Adrian Olvera'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adrian Olvera'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Follow these steps to configure:',
        title: 'Help',
        name: 'Adrian Olvera'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address" 
        })
    }

    geocode(req.query.address, (error, {location, longitude, latitude} = {}) => {
        if (error) {
          return res.send({ error })
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          
          res.send({
              forecast: forecastData,
              location,
              address: req.query.address
          })
        })
      })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        name: 'Adrian Olvera',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        name: 'Adrian Olvera',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})