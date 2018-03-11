// src/components/CreateGameButton.test.js
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { CreateGameButton } from './CreateGameButton'

describe('<CreateGameButton />', () => {
  const createGame = sinon.spy()
  const button = shallow(<CreateGameButton createGame={createGame} />)

  it('renders a button tag', () => {
    expect(button).toHaveTagName('button')
  })

  it('has the right class name', () => {
    expect(button).toHaveClassName('CreateGameButton')
  })

  describe('clicking it', () => {
    it('calls createGame', () => {
      button.simulate('click')
      expect(createGame.callCount).toBe(1)
    })
  })
})
