const Router = require('express').Router
const bcrypt = require('bcrypt')
const User = require('./model')
const requireUser = require('../authentication/middleware').requireUser

const router = new Router()

// registers a user
router.post('/users', (req, res) => {
  const user = {
  	email: req.body.email,
  	password: bcrypt.hashSync(req.body.password, 10)
  }

  User.create(user)
    .then(entity => {
      res.status(201)
      res.json({
    		id: entity.id,
    		email: entity.email
    	})
    })
    .catch(err => {
    	console.error(err)
    	res.status(500).send({
    		message: 'Something went wrong'
    	})
    })
})

module.exports = router
