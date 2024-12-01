import express from 'express'
import exphbs from 'express-handlebars'
import calculatorRoute from './routes/calculator-route.js'

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
    partialsDir: process.cwd() + '/views/_partials'
}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/calculation', calculatorRoute)

app.use((err, req, res, next) => {
    res.render('home', {
        error: err
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})