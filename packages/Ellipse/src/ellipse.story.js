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
    'kitchen sink',
    () => {
      const opts = { range: true, min: 0, max: 100 }
      const x = number('x', 15, opts)
      const y = number('y', 45, opts)
      const ox = number('origin x', 0, {...opts, min: -50 })
      const oy = number('origin y', 0, {...opts, min: -50 })
      const rot = number('rotate', 75, {...opts, max: 360 })
      const scale = number('scale', 1, {...opts, max: 3, step: 0.01})
      const r = number('radius', 1, opts)
      const tfms = text('transforms', '')
      return (
        <Canvas>
          <Ellipse
            origin={[ox, oy]}
            x={x} y={y}
            rot={rot}
            scale={scale}
            r={r}
            transforms={[tfms]}
            fill='#444444'
          >
          <circle cx={ox} cy={oy} r={1/scale} fill="indianred" />
          </Ellipse>
        </Canvas>
      )
    })
