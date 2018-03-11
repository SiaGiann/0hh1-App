// src/lib/game.js

// Returns array with indices of the wrongly placed values.
//
// Example:
//
// threeOrMoreInARow([0,1,1,1,2,1])
// => [1,2,3]
//
export const threeOrMoreInARow = (rowOrCol) => {
  const counts = rowOrCol
    .join('')
    .match(/([1-2]|0)\1*/g) || []

  const matches = []
    .concat
    .apply([], counts.map((m, i) =>
      new Array(m.length).fill(m.match(/0/) ? null : m.length)
    ))
    .map((l, i) => (l > 2 ? i : null))
    .filter((l) => (l !== null))

  return matches
}

// Returns the number of occurrences of `value` in `rowOrCol`.
//
// Example:
//
// numberOfValues([0,1,1,1,2,1], 1)
// => 4
//
export const numberOfValues = (rowOrCol, value) => {
  return rowOrCol
    .filter(v => v === value)
    .length
}

// Returns true if rowOrCol1 and rowOrCol2 are fully filled and the same.
//
// Example:
//
// areIdentical([1,2,1,2], [1,2,1,2])
// => true
//
// areIdentical([1,1,2,2], [1,2,1,2])
// => false
//
// areIdentical([1,2,0,2], [1,2,0,2])
// => false (not fully filled in, has 0s)
export const areIdentical = (rowOrCol1, rowOrCol2) => {
  if (numberOfValues(rowOrCol1, 0) > 0) return false
  if (numberOfValues(rowOrCol2, 0) > 0) return false

  return rowOrCol1
    .filter((v,i) => v === rowOrCol2[i])
    .length === rowOrCol1.length
}

// Counts the number of empty (0) values on board. Returns
// true if the number of empty values is 0. False otherwise.
export const isBoardFull = (board) => {
  return board
    .reduce((sum, row) => sum + numberOfValues(row, 0), 0) === 0
}

// Checks if the value is allowed in a row or column by looking
// the number of the same values already present in the row or
// column. Returns a boolean.
export const valueAllowed = (rowOrCol, value) => {
  return numberOfValues(rowOrCol, value) < (rowOrCol.length / 2)
}

// Returns the board: an array of rows
export const rows = (board) => {
  return board
}

// Returns a transposed array of columns on the board
export const cols = (board) => {
  return board
    .map((row, y) => row.map((v, x) => board[x][y]))
}

// Returns an array of indices of the columns on the board
// that are identical.
export const duplicateRows = (board) => {
  return board.map((row, index) => (
    board
    .filter((row2, index2) => (index !== index2 && areIdentical(row, row2)))
    .length > 0 ? index : null
  )).filter(v => v !== null)
}

// Returns an array of indices of the columns on the board
// that are identical.
export const duplicateCols = (board) => {
  return cols(board).map((col, index) => (
    cols(board)
    .filter((col2, index2) => (index !== index2 && areIdentical(col, col2)))
    .length > 0 ? index : null
  )).filter(v => v !== null)
}

// Checks if a value is a possible move on the board, given the selected
// position described by the rowIndex and columnIndex. Returns a boolean.
export const isPossibleMove = (board, rowIndex, columnIndex, value) => {
  const row = rows(board)[rowIndex]
  const col = cols(board)[columnIndex]

  if (!valueAllowed(row, value) || !valueAllowed(col, value)) return false

  // fill the value, so we can check out what the state will be after
  // the move was made
  const originalValue = board[rowIndex][columnIndex]
  board[rowIndex][columnIndex] = value

  if (threeOrMoreInARow(rows(board)[rowIndex]).length > 0 ||
    threeOrMoreInARow(cols(board)[columnIndex]).length > 0) {
      board[rowIndex][columnIndex] = originalValue // reset!
      return false
  }

  if (duplicateRows(board).length > 0 ||
    duplicateCols(board) > 0) {
      board[rowIndex][columnIndex] = originalValue // reset!
      return false
  }
  board[rowIndex][columnIndex] = originalValue // reset!

  return true
}

export const boardHasErrors = (board) => {
  // any dupe cols/rows?
  if (duplicateCols(board).length > 0) return true
  if (duplicateRows(board).length > 0) return true

  const rows = board
  const columns = cols(board)

  // too many of the same value in a row?
  if (rows.filter(row =>
    (numberOfValues(row, 1) > row.length / 2 ||
      numberOfValues(row, 2) > row.length / 2)
  ).length > 0) return true

  // too many of the same value in a col?
  if (columns.filter(column =>
    (numberOfValues(column, 1) > column.length / 2 ||
      numberOfValues(column, 2) > column.length / 2)
  ).length > 0) return true

  // any rows/cols with more than 3 consecutive vals?
  if (rows.map(threeOrMoreInARow).filter(e => (e.length > 0)).length > 0) return true
  if (columns.map(threeOrMoreInARow).filter(e => (e.length > 0)).length > 0) return true

  return false
}

export const gameFinished = (board) => {
  return !boardHasErrors(board) &&
    (numSquaresFilled(board) === board.length * board.length)
}

// Returns the number of squares on the board if isBoardFull(board), but subtracts
// the wrongly filled squares if correctOnly is true
export const numSquaresFilled = (board, correctOnly = false) => {
  const boardSize = board.length

  let filled = board
    .reduce((sum, row) => {
      return sum + boardSize - numberOfValues(row, 0)
    }, 0)

  if (!correctOnly || !boardHasErrors(board)) return filled

  const dupeCols = duplicateCols(board).length
  const dupeRows = duplicateRows(board).length

  return filled - (dupeCols / 2 * boardSize)
    - (dupeRows / 2 * boardSize)
    - board.map(row => threeOrMoreInARow(row)).reduce((sum, dupes) => (sum + dupes.length), 0)
    - cols(board).map(col => threeOrMoreInARow(col)).reduce((sum, dupes) => (sum + dupes.length), 0)
}

// Get the percentage of squares that have valid values
export const percentageFilled = (board) => {
  const boardSize = board.length
  return numSquaresFilled(board, true) / (boardSize * boardSize) * 100
}

// Return coordinates of filled (non-zero) positions on the board. Each position
// described as an array of the form [rowIndex, colIndex].
export const filledPositions = (board) => {
  const pos = board.map((row, rowIndex) => {
    return row
      .map((col, colIndex) => (col === 0 ? null : [rowIndex, colIndex]))
      .filter(pos => pos !== null)
  })
  return [].concat.apply([], pos)
}

export const removeRandomValuesFromBoard = (board, goalPercentage = 25) => {
  while (percentageFilled(board) > goalPercentage) {
    const positions = filledPositions(board)
    const [row, col] = positions[Math.floor(Math.random() * positions.length)]
    board[row][col] = 0
  }

  return board
}

// Fill the board with n * n squares and return the solved puzzle if solve = true, or return
// a playable board with 25% of the squares filled.
export const fillBoard = (n = 6, solve = false) => {
  const boardSize = n * n
  let board = new Array(n).fill(0)
    .map(() => new Array(n).fill(0))

  let tries = 0

  while (Math.round(percentageFilled(board)) < 100) {
    if (tries > boardSize * 50) {
      return fillBoard(n, solve)
    }

    const row = Math.floor(Math.random() * n)
    const col = Math.floor(Math.random() * n)

    const ones = numberOfValues(cols(board)[col], 1) +
      numberOfValues(rows(board)[row], 1)
      const twos = numberOfValues(cols(board)[col], 2) +
        numberOfValues(rows(board)[row], 2)
    const value = ones > twos ? 2 : 1

    if (isPossibleMove(board, row, col, value)) {
      board[row][col] = value
    }

    tries++
  }

  if (!solve) { removeRandomValuesFromBoard(board, 25) }

  return [board, filledPositions(board)]
}

export const playerProgress = (board, locked) => {
  const totalSquares = board.length * board.length
  const lockedSquares = locked.length
  const filledSquares = numSquaresFilled(board) // see previous exercise for implementation
  return (filledSquares - lockedSquares) / (totalSquares - lockedSquares)
}
