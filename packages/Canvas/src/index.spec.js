import 'raf/polyfill'
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import Canvas from '.'

describe('Canvas Component', function() {
  it('renders without props', function() {
    const wrapper = mount((<Canvas />))
    const canvas = wrapper.find('Canvas')
    expect(canvas.length).toBe(1)
  })
})
  