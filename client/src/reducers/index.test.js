import reducers from './index'

describe('reducers', () => {
  it('has board, sidebar, and locked reducers', () => {
    expect(Object.keys(reducers).includes('board')).toBe(true)
    expect(Object.keys(reducers).includes('sidebar')).toBe(true)
    expect(Object.keys(reducers).includes('locked')).toBe(true)
  })
})
