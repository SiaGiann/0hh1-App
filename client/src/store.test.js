import store from './store.js'

const emptyBoard = [
  [ 0,0,0,0,0,0 ],
  [ 0,0,0,0,0,0 ],
  [ 0,0,0,0,0,0 ],
  [ 0,0,0,0,0,0 ],
  [ 0,0,0,0,0,0 ],
  [ 0,0,0,0,0,0 ]
]

describe('Redux Store', () => {
  it('has an initial state', () => {
    expect(store.getState()).toEqual({
      board: emptyBoard,
      locked: [],
      sidebar: { open: true }
    })
  })
})
