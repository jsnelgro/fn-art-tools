import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, text } from '@storybook/addon-knobs'

import vzy, { Utils as _, Canvas, MouseProvider as withMouse, TimeProvider } from '@vzy/playground'
import Tri from '.'

storiesOf('viz/Triangle', module)
  .addDecorator(withKnobs)
  .add('Isosceles tri', () => {
    let opts = { min: 0, max: 100 }
    const h = number('height', 50, opts)
    const w = number('width', 50, opts)
    const x = number('x', 50, opts)
    const y = number('y', 50, opts)
    const rot = number('rotate', 0, {...opts, max: 360})
    const origin = text('origin', 'center')

    return (
      <Canvas style={{height: '96vh', border: '1px solid #4a4a4a'}}>
        <Tri {...{fill: 'indianred', h, w, x, y, rot, origin}} />
      </Canvas>
    )
  })
  .add('Isosceles tri with children', () => {
    let opts = { min: 0, max: 100 }
    const c = number('period', 10000, opts)
    const w = number('width', 100, opts)
    const x = number('x', 50, opts)
    const y = number('y', 50, opts)
    const rot = number('rotate', 0, {...opts, max: 360})
    const origin = text('origin', 'center')
    const Sketch = TimeProvider((props) => {
      let h = _.oscillate(props.time.t, -100, 100, c)
      return (
        <Canvas style={{height: '96vh', border: '1px solid #4a4a4a'}}>
          <text x={10} y={10} fontSize={8}>{Math.round(h)}</text>
          <Tri {...{fill: 'indianred', h, w, x, y, rot, origin}}>
            {_.range(10).map((i) => <Tri {...{ key: i,
              h:h/++i, w:w/i, x, y:y-i, fill: _.randHSL(0, 5*i, 4*i + 25)
            }} />)}
          </Tri>
        </Canvas>
      )
    })

    return <Sketch />
  })
  .add('Right triangle', () => {
    return (
      <Canvas style={{height: '96vh', border: '1px solid #4a4a4a'}}>
        <Tri isRight {...{
          fill: 'cadetblue',
          x: 25, y: 25, h: 25, w: 25
        }}/>
      </Canvas>
    )
  })
  .add('user specified points', () => {
    return (
      <Canvas style={{height: '96vh', background: 'moccasin'}}>
        {_.range(50).map(i => <Tri {...{
          key: i,
          p1: _.range(2).map(x => ~~(Math.random() * 100)),
          p2: _.range(2).map(x => ~~(Math.random() * 100)),
          p3: _.range(2).map(x => ~~(Math.random() * 100)),
          fill: _.randChoice('indianred', 'indianred', '#d77575', 'cadetblue', 'cadetblue', '#86b5b6', 'lightyellow'),
          stroke: '#4a4a4a',
          strokeWidth: 1
        }}/>)}
      </Canvas>
    )
  })
