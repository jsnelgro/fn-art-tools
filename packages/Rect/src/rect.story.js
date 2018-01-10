import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import Rect from '.'
import Canvas from '@vzy/canvas'

function divmod(n, m) {
  return [~~(n / m), n % m]
}

storiesOf('viz/Rect', module)
  .addDecorator(withKnobs)
  .add('basic rect', () => {
    let opts = { min: 0, max: 100 }
    const h = number('height', 25, opts)
    const w = number('width', 25, opts)
    const x = number('x', 25, opts)
    const y = number('y', 25, opts)
    const rot = number('rotate', 0, opts)

    return (
      <Canvas style={{height: '96vh', border: '1px solid #4a4a4a'}}>
        <Rect fill={'indianred'} {...{h, w, x, y, rot}} />
      </Canvas>
    )
  })
  .add('nested rects', () => {
    let opts = { min: 0, max: 100 }
    const h = number('height', 33, opts)
    const w = number('width', 55, opts)
    const x = number('x', 25, opts)
    const y = number('y', 15, opts)
    const rot = number('rotate', 5, opts)
    
    return (
      <Canvas style={{height: '96vh', border: '1px solid #4a4a4a'}}>
        <Rect hasOwnCoordinateSpace {...{fill: 'indianred', h, w, x, y, rot}}>
          <Rect {...{
            fill: 'papayawhip', h: 45, w: 48, x:10, y:10
          }}>
            {[...Array(45).keys()].map((i) => {
              return <Rect {...{
                h:3, w:3, rot: 45,
                x: divmod(i*5 + 3.5, 45)[1], y:divmod(i*5, 45)[0] * 8 + 4.5,
                fill:'cadetblue', key: i}}
              />
            })}
          </Rect>
          <Rect hasOwnCoordinateSpace {...{
              fill: '#666666', h: 250, w: 5,
              x: 0, y: -5
            }}>
              <Rect {...{
                  fill: '#888888', h: 100, w: 33,
                  x: 0, y: 0
                }} />
          </Rect>
        </Rect>
      </Canvas>
    )
  })
