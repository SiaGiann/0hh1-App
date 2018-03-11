const verify = require('../jwt').verify
const User = require('../users/model')

const tokenMiddleware = (req, res, next) => {
  if (!req.headers.authorization) return next()

  const auth = req.headers.authorization.split(' ')
  if (auth[0] === 'Bearer') {
    verify(auth[1], function (err, jwt) {
      if (err) {
        console.error(err)
        res.status(400).send({
          message: "JWT token invalid"
        })
      }
      else {
        User
          .findById(jwt.id)
          .then(entity => {
            req.user = entity
            next()
          })
          .catch(err => {
            console.error(err)
            res.status(500).send({
              message: 'Something went horribly wrong'
            })
          })
      }
    })
  }
  else next()
}

const requireUser = (req, res, next) => {
	if (req.user) next()
	else res.status(401).send({
		message: 'Please login'
	})
}

module.exports = { tokenMiddleware, requireUser }
