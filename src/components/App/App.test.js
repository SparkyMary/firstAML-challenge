import React from 'react'
import App from './App'
import { shallow } from 'enzyme'

describe('App', () => {
  it('should contain "main" html element', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('main')).toHaveLength(1)
  })

  it('should contain "h1" html element', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('main')).toHaveLength(1)
  })
})
