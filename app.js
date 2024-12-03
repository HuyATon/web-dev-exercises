import express from 'express'
import exphbs from 'express-handlebars'
import db from './utils/db.js'

import authRouter from './routes/authRouter.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.cwd() + '/public'))
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: process.cwd() + '/views/layouts',
    partialsDir: process.cwd() + '/views/partials'
})
)
app.set('view engine', 'hbs')

// global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    res.send(err)
})

// routes
app.use('/auth', authRouter)

app.get('/', async (req, res) => {
    res.redirect('/auth/login')
})


app.get('/register', (req, res) => {
    res.render('register')
})

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`)
})