import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import withScroll from '.'
import Canvas from '@vzy/canvas'

storiesOf('ScrollProvider', module)
  .addDecorator(withKnobs)
  .add('y-axis pagescroll', () => {
    const ScrollProvider = withScroll((props) => {
      const { y } = props.scroll
      return (<div {...props}>
        <div style={{
          color:`hsl(0, 0%, 100%)`,
          background: 'hsla(0, 0%, 50%, 0.75)',
          padding: 10,
          position: 'fixed', top:25, left:25
          }}>
          {JSON.stringify(props)}
        </div>
        <div style={{height:'600vh', background: 'linear-gradient(to bottom, papayawhip, indianred)'}}></div>
      </div>)
    })
    return (<ScrollProvider />)
  })
  .add('x-axis pagescroll', () => {
    const ScrollProvider = withScroll((props) => {
      const { x } = props.scroll
      return (<div {...props}>
        <div style={{
          color:`hsl(0, 0%, 100%)`,
          background: 'hsla(0, 0%, 50%, 0.75)',
          padding: 10,
          position: 'fixed', top:25, left:25
          }}>
          {JSON.stringify(props)}
        </div>
        <div style={{overflowX: 'scroll', height:'80vh', width:'600vw', background: 'linear-gradient(to right, papayawhip, indianred)'}}></div>
      </div>)
    })
    return (<ScrollProvider />)
  })
