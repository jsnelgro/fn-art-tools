import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import { line } from '@vzy/utils'

import withWindowMouse, { withMouse } from '.'

import Canvas from '@vzy/canvas'

storiesOf('MouseProvider', module)
  .addDecorator(withKnobs)
  .add('with global page position', () => {
    const WithMouse = withWindowMouse((props) => (
      <div style={{
        fontFamily: 'sans-serif', letterSpacing: '1px',
        height: '80vh', display: 'flex', alignItems:'center', justifyContent: 'center'
      }}>
      {JSON.stringify(props.mouse)}
      </div>
    ))

    return <WithMouse />
  })
  .add('with local svg position', () => {
    const h = number('height', 200)
    const w = number('width', 200)

    const MouseProvider = withMouse()((props) => {
      const {x, y} = props.mouse
      return (
      <Canvas h={h} w={w} style={{width: '250px', display:'block', margin: '25vh auto'}} {...props}>
        <rect
          stroke={'#4a4a4a'}
          fill={'papayawhip'}
          height={h} width={w} />
        <circle cx={x} cy={y} r={2} />
        <text
          fill={'#4a4a4a'}
          x={x - 20} y={y - 10}
        >
          {String(~~x +' '+ ~~y)}
        </text>
      </Canvas>
    )})
    return <MouseProvider />
  })
  .add('with separate target zone', () => {
    const MousePad = (props) => {
      const style = {
        margin: '0 auto',
        color: 'papayawhip',
        background: 'indianred',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        height: props.height + 'px',
        width: props.width + 'px',
      }
      return (
      <div style={style} {...props}>
        move mouse around here!
      </div>
      )
    }
    const MouseProvider = withMouse()((props) => {
      const cw = number('canvas width', 500)
      const ch = number('canvas height', 200)
      const mpw = number('mousepad width', 300)
      const mph = number('mousepad height', 300)
      const cx = line(props.mouse.x, 0, mpw, 0, cw)
      const cy = line(props.mouse.y, 0, mph, 0, ch)

      return (<div style={{height: '80vh', display: 'flex', 'alignItems': 'center', justifyContent: 'center'}} >
        <Canvas h={ch} w={cw} style={{margin: '0 auto', width: cw + 'px', height: ch + 'px'}}>
          <rect height={ch} width={cw} fill={'#4a4a4a'} />
          <circle cx={cx} cy={cy} r={8} fill={'indianred'} />
          <circle cx={cx} cy={cy} r={4} fill={'cadetblue'} />
        </Canvas>
        <MousePad
          height={mph}
          width={mpw}
          onMouseMove={props.onMouseMove}
        />
      </div>)
    })
    return <MouseProvider />
  })
