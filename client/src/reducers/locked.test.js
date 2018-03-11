// src/reducers/locked.test.js

import locked from './locked'
import { CREATE_GAME } from '../actions/types'

describe('locked reducer', () => {
  const reducer = locked
  const initialState = []

  it('sets the initial state of the locked squares to an empty array', () => {
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

    it('returns the new locked positions', () => {
      expect(reducer(initialState, action)).toEqual(locked)
    })
  })
})

