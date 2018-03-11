// src/lib/game.test.js

import {
threeOrMoreInARow,
numberOfValues,
areIdentical,
isBoardFull,
valueAllowed,
rows, cols,
duplicateRows, duplicateCols,
isPossibleMove,
numSquaresFilled,
percentageFilled,
fillBoard
} from './game'

describe('threeOrMoreInARow', () => {
  const row = [0,2,1,2,2,2]
  const col = [1,1,1,0,2,2]
  const col1 = [0,1,1,1,2,1]

  it('returns the indices of the wrongly placed values', () => {
    expect(threeOrMoreInARow(row)).toEqual([3,4,5])
    expect(threeOrMoreInARow(col)).toEqual([0,1,2])
    expect(threeOrMoreInARow(col1)).toEqual([1,2,3])
  })
})

describe('numberOfValues', () => {
  const row = [0,2,1,2,2,2]

  it('returns the number of values', () => {
    expect(numberOfValues(row, 2)).toEqual(4)
    expect(numberOfValues(row, 1)).toEqual(1)
  })
})

describe('areIdentical', () => {
  it('returns true of rows or cols are identical', () => {
    expect(areIdentical([1,2,1,2], [1,2,1,2])).toBe(true)
  })

  it('returns false of rows or cols are not identical', () => {
    expect(areIdentical([1,1,2,2], [1,2,1,2])).toBe(false)
  })

  it('returns false if rows are not fully filled in', () => {
    expect(areIdentical([1,2,0,2], [1,2,0,2])).toBe(false)
  })
})

describe('isBoardFull', () => {
  const fullBoard = [
    [1,2,1,2],
    [1,1,2,2],
    [2,2,1,1],
    [2,1,2,1]]

  const board = [
    [1,2,1,2],
    [1,1,2,2],
    [2,0,1,1],
    [2,1,2,1]]

  it('returns true if the board is full', () => {
    expect(isBoardFull(fullBoard)).toBe(true)
  })

  it('returns false if the board is not full', () => {
    expect(isBoardFull(board)).toBe(false)
  })
})

describe('valueAllowed', () => {
  it('returns true if a value is allowed in the row or col', () => {
    expect(valueAllowed([1,1,2,0,2,1], 1)).toBe(false)
    expect(valueAllowed([1,1,2,0,2,1], 2)).toBe(true)
  })
})

describe('rows and cols', () => {
  const board = [
    [1,2,1,2],
    [1,1,2,2],
    [2,2,1,1],
    [2,1,2,1]]

  const columns = [
    [1,1,2,2],
    [2,1,2,1],
    [1,2,1,2],
    [2,2,1,1]]

 it('return the rows or cols', () => {
   expect(rows(board)).toEqual(board)
   expect(cols(board)).toEqual(columns)
 })
})

describe('duplicateRows and duplicateCols', () => {
  const board = [
    [1,2,2,1],
    [1,1,1,2],
    [1,2,2,1],
    [2,1,1,2]]

  it('return the duplicate rows or cols', () => {
    expect(duplicateRows(board)).toEqual([0,2])
    expect(duplicateCols(board)).toEqual([1,2])
  })

  const boardWithZeros = [
    [0,0,2,1],
    [0,0,0,0],
    [0,0,2,1],
    [0,0,1,2]]

  it('ignore zeros', () => {
    expect(duplicateRows(boardWithZeros)).toEqual([])
    expect(duplicateCols(boardWithZeros)).toEqual([])
  })
})

describe('numSquaresFilled', () => {
  const boardWithZeros = [
    [0,0,2,1],
    [0,0,0,0],
    [0,0,2,1],
    [0,0,1,2]]

  it('counts all squares with a values that are non-zero', () => {
    expect(numSquaresFilled(boardWithZeros)).toEqual(6)
  })
})

describe('isPossibleMove', () => {
  const board = [
    [0,0,2,1],
    [0,0,0,0],
    [0,0,2,1],
    [0,0,1,2]]

  it('returns true if a move is possible', () => {
    expect(isPossibleMove(board, 0, 0, 1)).toEqual(true)
  })

  it('returns false if a move is not possible', () => {
    expect(isPossibleMove(board, 1, 2, 2)).toEqual(false)
  })
})

describe('fillBoard', () => {
  const [board, locked] = fillBoard(4)

  it('fills a board for 25% percent', () => {
    expect(percentageFilled(board)).toEqual(25)
  })

  it('returns the locked values in a separate array', () => {
    expect(locked.length).toEqual(4)
  })
})
