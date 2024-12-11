const express = require('express')
const { create } = require('express-handlebars')
require('dotenv').config()

// routes
const authR = require('./routes/authR.js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// View engine
const hbs = create({
    extname: '.hbs',
    encoding: 'utf8',
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials',
    defaultLayout: 'main',
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', process.cwd() + '/views')

// Config passport
require('./middlewares/ppconfigs')(app)

// Errors handlers
app.use((err, req, res, next) => {
    res.send(err)
})

// Routes
app.use('/', authR)


app.get('/', (req, res) => {
    console.log('foo')
    res.send('Admin Page')
})

// Protect routes below this mws
app.use((req, res, next) => {

    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }

    next()
})






app.listen(PORT, () => {
    console.log('App listening at: http://localhost:' + PORT)
})
