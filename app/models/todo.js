const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Todo = new Schema({
  description: String,
  done: Boolean
})

module.exports = mongoose.model('Todo', Todo)
