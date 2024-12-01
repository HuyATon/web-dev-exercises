import express from 'express'
import exphbs from 'express-handlebars'
import usersRouter from './routes/users-router.js'

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(process.cwd() + '/public'))
app.set('views', process.cwd() + '/views')


app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: process.cwd() + '/views/_layouts',
    partialsDir: process.cwd() + '/views/_partials',
    helpers: {
        equals: (a, b) => a === b
    }
}))
app.set('view engine', 'hbs')


// global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    // res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message
    // })
    res.send(err.message)
})

app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.redirect('/users')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})