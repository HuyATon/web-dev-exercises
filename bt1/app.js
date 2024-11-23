import express from 'express'
import { engine } from 'express-handlebars'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/calculation', (req, res) => {
    let { x, y, operator } = req.body
    let result = 0
    x = parseFloat(x)
    y = parseFloat(y)

    if (isNaN(x) || isNaN(y)) {
        res.render('index', {
            x: null,
            y: null,
            operator: operator,
            error: 'Invalid input'
        })
        return
    }

    if (y === 0 && operator === '/') {
        res.render('index', {
            x: x,
            y: y,
            operator: operator,
            error: 'Can not divide by zero'
        })
        return
    }
 

    switch (operator) {
        case "+":
            result = x + y
            break
        case "-":
            result = x - y
            break
        case "*":
            result = x * y
            break
        case "/":
            result = x / y
            break
    }
    res.render('index', {
        x: x,
        y: y,
        operator: operator,
        result: result,
        error: null
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
