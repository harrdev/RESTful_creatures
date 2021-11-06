const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')
// Middleware -- intercepts request object before object hits routes and intercepts response object before shipped back to client
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// body-parser middleware for form
// makes req.body work.  takes form data and attaches as object to req.body
app.use(express.urlencoded({extended: false}))
// MIDDLEWARE TO ALLOW POST/DELETE since it's not allowed by default
app.use(methodOverride('_method'))
// CONTROLLERS MIDDLEWARE
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/creatures', require('./controllers/creatures.js'))
// HOME ROUTE
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(8000, () => {
    console.log("Listening on port 8000")
})

