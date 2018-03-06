const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const jwt = require('jsonwebtoken')

router.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, '123', function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })
      } else {
        // if everything is good, save to req for use in other routes
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

router.get('/', (req, res) => {
  Todo.find().then(todos => {
    res.json({todos})
  })
})

router.post('/', (req, res) => {
  console.log(req.decoded)
  Todo.create({ description: req.body.description, done: false, user_id: req.decoded._id }, function (err, todo) {
    if (err) return res.status(500).send(err)
    res.json(todo)
  })
})

router.put('/:todoId', (req, res) => {
  Todo.findByIdAndUpdate(req.params.todoId, req.body, {new: true}, (err, todo) => {
    if (err) return res.status(500).send(err)
    return res.send(todo)
  })
})

router.delete('/:todoId', (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send({
      success: true,
      message: 'Todo successfully deleted',
      id: todo._id
    })
  })
})
module.exports = router
