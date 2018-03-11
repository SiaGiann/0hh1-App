// src/reducers/board.test.js

import board from './board'
import { CREATE_GAME, MOVE } from '../actions/types'

describe('board reducer', () => {
  const reducer = board
  const initialState = [
    [ 0,0,0,0,0,0 ],
    [ 0,0,0,0,0,0 ],
    [ 0,0,0,0,0,0 ],
    [ 0,0,0,0,0,0 ],
    [ 0,0,0,0,0,0 ],
    [ 0,0,0,0,0,0 ]
  ]

  it('returns an empty array for the initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  describe(CREATE_GAME, () => {
    const board = [
      [0,1,1,0],
      [0,2,0,0],
      [1,0,0,0],
      [0,2,0,0]
    ]

    const locked = [
      [0,1],
      [0,2],
      [1,1],
      [2,0],
      [3,1]
    ]

    const action = {
      type: CREATE_GAME,
      payload: {
        board,
        locked
      }
    }

    it('returns the new board', () => {
      expect(reducer(initialState, action)).toEqual(board)
    })
  })

  describe(MOVE, () => {
    const initialState = [
      [0,1,1,0],
      [0,2,0,0],
      [1,0,0,0],
      [0,2,0,0]
    ]

    const action = {
      type: MOVE,
      payload: {
        row: 0,
        col: 2
      }
    }

    const eventualState = [
      [0,1,2,0],
      [0,2,0,0],
      [1,0,0,0],
      [0,2,0,0]
    ]

    it('returns the new board', () => {
      expect(reducer(initialState, action)).toEqual(eventualState)
    })
  })
})
