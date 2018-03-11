const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const usersRouter = require('./users/router')
const authRouter = require('./authentication/router')
const tokenMiddleware = require('./authentication/middleware').tokenMiddleware
const requireUser = require('./authentication/middleware').requireUser
const { Game } = require('./models')

const port = process.env.PORT || 4001

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(tokenMiddleware)
  .use(usersRouter)
  .use(authRouter)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.post('/games', (req, res) => {
  const initialBoard = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ]
  const gameStatus = "NEW"
  const { user_id } = req.body

  const game = {
    user_id: user_id,
    board_status: JSON.stringify(initialBoard),
    game_status: gameStatus
  }

  Game
    .create(game)
    .then(entity => {
      res.status(201)
      res.json({
        board_status: entity.board_status,
        game_status: entity.game_status
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
})

app.listen(port, () => {
  console.log(`listening for incoming connections on http://localhost:${port}`)
})
