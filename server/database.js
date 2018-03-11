const Sequelize = require('sequelize');
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'secret',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize
