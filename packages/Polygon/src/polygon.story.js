import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs'

import { Canvas } from '@vzy/playground'
import Polygon from '.'

storiesOf('viz/Polygon', module)
  .addDecorator(withKnobs)
  .add('simple polygon', () => {
    let opts = { min: 0, max: 100 }
    const sides = number('sides', 6, opts)
    const h = number('height', 50, opts)
    const w = number('width', 50, opts)
    const x = number('x', 50, opts)
    const y = number('y', 50, opts)
    const rot = number('rotate', 0, {...opts, max: 360})
    const origin = text('origin', 'center')

    return (
      <Canvas style={{height: '96vh', background:'moccasin'}}>
        <Polygon {...{
          sides, h, w, x, y, rot, origin,
          fill: 'indianred',
          stroke: '#4a4a4a'
        }}>
          <Polygon {...{
            x:0, y:0, h: h/3, w: w/3,
            fill: 'moccasin', stroke: '#4a4a4a',
            sides: Math.max(sides - 1, 2)
          }}/>
        </Polygon>
      </Canvas>
    )
  })
