import express from 'express'
import path from 'path'
const app = express()
const port =  3000
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {

    res.sendFile(path.join(process.cwd(), 'views', 'index.html'))
})
app.post('/calculation', (req, res) => {

    console.log(req.body)
})


app.listen(port, () => {
    console.log(`Server has been started on http://localhost:${port}`)
})