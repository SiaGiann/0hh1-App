// src/App.test.js
import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('<App />', () => {
  const app = shallow(<App />)

  it('wraps everything in a div tag', () => {
    expect(app).toHaveTagName('div')
    expect(app).toHaveClassName('App')
  })

  it('contains a title', () => {
    expect(app.find('h1.title')).toHaveText('0hh1')
  })
})
