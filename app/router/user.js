const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
router.get('/', (req, res) => {
  User.find().then(users => {
    res.json({users})
  })
})

router.post('/signup', (req, res) => {
  User.create({ username: req.body.username, password: req.body.password }, function (err, user) {
    if (err) res.status(500).send({success: false})
    res.json({ success: true })
  })
})

router.delete('/:userId', (req, res) => {
  User.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send({
      success: true,
      message: 'User successfully deleted',
      id: user._id
    })
  })
})

router.post('/login', (req, res) => {
  console.log(req.body)
  User.findOne({ 'username': req.body.username }, function (err, user) {
    console.log(user)
    if (err) return res.status(400).send({success: false, message: 'Authentication failed. User not found.'})
    if (user.password !== req.body.password) return res.status(400).send({success: false, message: 'Authentication failed. Wrong password.'})
    return res.json({token: jwt.sign({ email: user.email, _id: user._id, username: user.username }, '123')})
  })
})
module.exports = router
