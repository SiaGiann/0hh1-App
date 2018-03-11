import React from 'react'
import { shallow } from 'enzyme'
import { Board } from './Board.js'
import { duplicateCols, duplicateRows, cols, threeOrMoreInARow } from '../lib/game'

const emptyBoard = [
  [ 0,0,0,0 ],
  [ 0,0,0,0 ],
  [ 0,0,0,0 ],
  [ 0,0,0,0 ]
]

const dupeRows = duplicateRows(emptyBoard)
const dupeCols = duplicateCols(emptyBoard)

const errors = {
  rows: emptyBoard.map(threeOrMoreInARow),
  cols: cols(emptyBoard).map(threeOrMoreInARow)
}

describe('<Board />', () => {
  const board = shallow(
    <Board
      board={emptyBoard}
      dupeRows={dupeRows}
      dupeCols={dupeCols}
      errors={errors}
    />
  )

  it('renders a div with class Board', () => {
    expect(board).toHaveTagName('div')
    expect(board).toHaveClassName('Board')
  })
})
