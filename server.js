require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/todos`, { useMongoClient: true })
const port = process.env.PORT || 9999
var todosRoute = require('./app/router/todos')
var userRoute = require('./app/router/user')
app.use('/todos', todosRoute)
app.use('/user', userRoute)

app.listen(port)
console.log('Server is running on port: ' + port)
