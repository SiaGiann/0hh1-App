// src/containers/Board.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { duplicateCols, duplicateRows, cols, threeOrMoreInARow } from '../lib/game'
import Square from '../components/Square'
import './Board.css'

export class Board extends PureComponent {
  static propTypes = {
    board: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number)
    ).isRequired,
    dupeRows: PropTypes.arrayOf(PropTypes.number),
    dupeCols: PropTypes.arrayOf(PropTypes.number),
    errors: PropTypes.shape({
      rows: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number)),
      cols: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number)),
    }).isRequired
  }

  renderRow = (row, index) => {
    return (
      <div className="row" key={index}>
        {row.map(this.renderSquare(index))}
      </div>
    )
  }

  renderSquare = rowIndex => (value, index) => {
    const { dupeCols, dupeRows, errors, board } = this.props

    const dupe = dupeCols.includes(index) || dupeRows.includes(rowIndex)

    const error = errors.cols[index].includes(rowIndex) ||
      errors.rows[rowIndex].includes(index) ||
      board[rowIndex].filter(v => v !== 0 && v === value).length > board.length / 2 ||
      cols(board)[index].filter(v => v !== 0 && v === value).length > board.length / 2

    return (
      <Square
        key={index}
        value={value}
        dupe={dupe}
        error={error}
        x={index}
        y={rowIndex}
      />
    )
  }

  render() {
    return (
      <div className="Board">
        {this.props.board.map(this.renderRow)}
      </div>
    )
  }
}

const mapStateToProps = ({ board }) => ({
  board,
  dupeRows: duplicateRows(board),
  dupeCols: duplicateCols(board),
  errors: {
    rows: board.map(threeOrMoreInARow),
    cols: cols(board).map(threeOrMoreInARow)
  }
})

export default connect(mapStateToProps)(Board)
