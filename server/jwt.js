const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'JWT_~secret*\\key'

const sign = (userId) => {
	return jwt.sign({ id: userId }, secret, { expiresIn: '3h' })
}

const verify = (token, callback) => {
  jwt.verify(token, secret, callback)
}

module.exports = { sign, verify, secret }
