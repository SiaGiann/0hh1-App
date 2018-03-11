import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { playerProgress } from '../lib/game'

export class Progress extends PureComponent {
  static propTypes = {
    progress: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div className="Progress">
        <p>{this.props.progress} %</p>
      </div>
    )
  }
}

const mapStateToProps = ({ board, locked }) => {
  return {
    progress: Math.floor(playerProgress(board, locked) * 100)
  }
}

export default connect(mapStateToProps)(Progress)
