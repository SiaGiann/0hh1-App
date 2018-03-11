// src/reducers/sidebar.test.js

import sidebar from './sidebar'

describe('sidebar reducer', () => {
  const reducer = sidebar
  const initialState = { open: true }

  it('sets the initial state of the sidebar to open', () => {
    expect(reducer()).toEqual(initialState)
  })
})
