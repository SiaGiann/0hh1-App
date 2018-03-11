const Sequelize = require('sequelize')
const sequelize = require('../models').sequelize

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  }
}, {
  tableName: 'Users'
})

module.exports = User
