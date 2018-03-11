const Router = require('express').Router
const bcrypt = require('bcrypt')
const User = require('./model')
const requireUser = require('../authentication/middleware').requireUser

const router = new Router()

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

// retrieving users with their id
router.get('/users/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user)
      } else {
        res.status(404)
        res.json({ message: 'User not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the user. Please try again' })
    })
})

// // Edit user action
// const patchOrPut = (req, res) => {
//   User
//     .findById(req.params.id)
//     .then(user => {
//       return user.update(req.body)
//     })
//     .then(final => {
//       res.json(final)
//     })
//     .catch(err => {
//       res.status(500).send({ message: `something went wrong`, err })
//     })
// }
//
// router.put('/users/:id', patchOrPut)
// router.patch('/users/:id', patchOrPut)

module.exports = router
