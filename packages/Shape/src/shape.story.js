import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, text } from '@storybook/addon-knobs'
// import readme from './README.md'
// import { doc } from '/storybook-helpers'

import Canvas from '@vzy/canvas'
import Shape from '.'

storiesOf('viz/Shape', module)
  .addDecorator(withKnobs)
  .add(
    'kitchen sink',
    () => {
      const opts = { range: true, min: 0, max: 100 }
      const x = number('x', 15, opts)
      const y = number('y', 45, opts)
      const ox = number('origin x', 25, {...opts, min: -50 })
      const oy = number('origin y', 25, {...opts, min: -50 })
      const rot = number('rotate', 75, {...opts, max: 360 })
      const scale = number('scale', 0.5, {...opts, max: 3, step: 0.01})
      const skx = number('skew x', 0, {...opts, min: -180, max: 90 })
      const sky = number('skew y', 0, {...opts, min: -180, max: 90 })
      const tfms = text('transforms', '')
      return (
        <Canvas>
          <Shape
            origin={[ox, oy]}
            x={x} y={y}
            rot={rot}
            scale={scale}
            skew={[skx, sky]}
            transforms={[tfms]}
            >
            <rect height={50} width={50} fill="#4a4a4a" />
            <rect x={5} height={25} width={25} fill="navajowhite" />
            <circle cx={ox} cy={oy} r={1/scale} fill="indianred" />
          </Shape>
        </Canvas>
      )
    })
