const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const usersRouter = require('./users/router')
const authRouter = require('./authentication/router')
const tokenMiddleware = require('./authentication/middleware').tokenMiddleware
const requireUser = require('./authentication/middleware').requireUser
const { Game } = require('./models')
const rules = require('./lib/game')

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

// start a new game by initializing a board with 0
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

// we want to update our game board based on user actions
const patchOrPut = (req, res) => {
  const { x, y } = req.body // x & y axis
  Game
    .findById(req.params.id)
    .then(game => {
      let { board_status, game_status } = game
      if (game_status === "ENDED") {
        throw "Game has ended..."
      }
      let board = JSON.parse(board_status)

      switch (board[x][y]) {
        case 0:
          newVal = 1
          break
        case 1:
          newVal = 2
          break
        default:
          newVal = 0
          break
      }
      board[x][y] = newVal
      const newGame = {
        board_status: JSON.stringify(board),
        game_status: rules.gameFinished(board) ? "ENDED" : "ACTIVE"
      }
      return game.update(newGame)
    })
    .then(final => {
      res.json([final, rules.boardHasErrors(JSON.parse(final.board_status))])
    })
    .catch(err => {
      res.status(500).send({ message: `something went wrong`, err })
    })
}

app.put('/games/:id', patchOrPut)
app.patch('/games/:id', patchOrPut)

app.listen(port, () => {
  console.log(`listening for incoming connections on http://localhost:${port}`)
})
