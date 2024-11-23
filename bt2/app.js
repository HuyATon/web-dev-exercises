import express from 'express'
import path from 'path'
const app = express()
const port =  3000
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {

    res.sendFile(path.join(process.cwd(), 'views', 'index.html'))
})
app.post('/calculation', (req, res) => {
    const { x, y, operator } = req.body
    var result = 0
    switch (operator) {
        case "plus":
            result = x + y
            break
        case "minus":
            result = x - y
            break
        case "multiply":
            result = x * y
            break
        case "divide":
            result = x / y
            break
    }
    res.send({ result: result })
})


app.listen(port, () => {
    console.log(`Server has been started on http://localhost:${port}`)
})