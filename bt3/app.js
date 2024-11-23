import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'

const port = 3000
const app = express()

const attendees = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set up handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// Set up static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/confirm', (req, res) => {
    res.render('confirm')
})

app.get('/attendee-list', (req, res) => {
    res.render('attendee_list', {
        "attendees": attendees
    })
})

app.post('/confirm', (req, res) => {
    console.log(req.body)
    const { name, email, willAttend } =  req.body
    const newAttendee = {
        "name": name,
        "email": email,
        "willAttend": (willAttend === undefined) ? "No" : "Yes" 
    }
    attendees.push(newAttendee)
    res.render('response', {
        "attendee": newAttendee
    })
})





app.listen(port, () => {
    console.log(`Server has been started on http://localhost:${port}`)
})