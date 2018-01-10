import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, text } from '@storybook/addon-knobs'
// import readme from './README.md'
// import { doc } from '/storybook-helpers'

import Canvas from '@vzy/canvas'
import Ellipse from '.'

storiesOf('viz/Ellipse', module)
  .addDecorator(withKnobs)
  .add(
    'basic circle',
    () => {
      const opts = { range: true, min: 0, max: 100 }
      const x = number('x', 50, opts)
      const y = number('y', 50, opts)
      const rot = number('rotate', 0, {...opts, max: 360 })
      const r = number('radius', 25, opts)
      const origin = text('origin', 'center')
      return (
        <Canvas style={{height: '96vh', border: '1px solid #4a4a4a'}}>
          <Ellipse {...{x, y, rot, r, origin, fill: '#444444'}} />
        </Canvas>
      )
    })
    .add(
      'basic ellipse',
      () => {
        const opts = { range: true, min: 0, max: 100 }
        const x = number('x', 25, opts)
        const y = number('y', 15, opts)
        const h = number('h', 65, opts)
        const w = number('w', 50, opts)
        const rot = number('rotate', 0, {...opts, max: 360 })
        const origin = text('origin', 'center')
        return (
          <Canvas style={{height: '96vh', border: '1px solid #4a4a4a', background: 'darksalmon'}}>
            <Ellipse {...{h, w, x, y, rot, origin, fill: 'lightyellow'}} />
          </Canvas>
        )
      })
      .add(
        'nesting ellipses',
        () => {
          const opts = { range: true, min: 0, max: 100 }
          const x = number('x', 25, opts)
          const y = number('y', 15, opts)
          const h = number('h', 65, opts)
          const w = number('w', 50, opts)
          const rot = number('rotate', 0, {...opts, max: 360 })
          const origin = text('origin', 'center')
          return (
            <Canvas style={{height: '96vh', border: '1px solid #4a4a4a', background: 'cadetblue'}}>
              <Ellipse {...{h, w, x, y, rot, origin, fill: 'lightyellow'}}>
                {[...Array(10).keys()].map(i => (<Ellipse {
                  ...{r: 5 * Math.random(), x: 9*(i+1), y: 25 + 50 * Math.random(), fill: 'darksalmon', key: i}}
                />))}
              </Ellipse>
            </Canvas>
          )
        })
