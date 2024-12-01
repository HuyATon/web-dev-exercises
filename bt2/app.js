import express from 'express'
import exphbs from 'express-handlebars'
import feedbackFormRouter from './routes/feedback-form-router.js'
import feedbacksListRouter from './routes/feedbacks-list-router.js'

const PORT = 3000 
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(process.cwd() + '/public'))

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: process.cwd() + '/views/_layouts/',
    partialsDir: process.cwd() + '/views/_partials/'
}))
app.set('view engine', 'hbs')
app.set('views', process.cwd() + '/views')


app.get('/', (req, res) => {
    res.render('home')
})

app.use('/feedback-form', feedbackFormRouter)
app.use('/feedbacks', feedbacksListRouter)



app.listen(PORT, () => {
    console.log("Server is listening on http://localhost:" + PORT)
})