const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 9999;
app.use('/', function (request, response) {
    response.json({ message: 'Hello world' })
})

app.listen(port)
console.log('Server is running on port: ' + port)