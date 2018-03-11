const Router = require('express').Router
const bcrypt = require('bcrypt')
const User = require('../users/model')
const sign = require('../jwt').sign

const router = new Router()

router.post('/logins', (req, res) => {
  User
  	.findOne({
  		where: {
  			email: req.body.email
  		}
  	})
  	.then(entity => {
  		if (bcrypt.compareSync(req.body.password, entity.password)) {
  			res.send({
  				jwt: sign(entity.id)
  			})
  		}
  		else {
  			res.status(400).send({
  				message: 'Password was incorrect'
  			})
  		}
  	})
  	.catch(err => {
  		console.error(err)
  		res.status(500).send({
  			message: 'Something went wrong'
  		})
  	})
})

module.exports = router
