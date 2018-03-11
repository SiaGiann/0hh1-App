// src/reducers/locked.js
import { CREATE_GAME } from '../actions/types'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case CREATE_GAME :
      return [].concat(payload.locked)

    default :
      return state
  }
}
