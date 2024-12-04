import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'

// routes
import authRouter from './routes/authRouter.js'
import categoriesRouter from './routes/categoriesRouter.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: { maxAge: 60000}
}))

// views
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
app.get('/', async (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/categories')
    }
    else {
        res.redirect('/auth/login')
    }
})

app.use('/auth', authRouter)
app.use('/categories', categoriesRouter)






app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`)
})