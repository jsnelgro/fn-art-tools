import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import Rect from '.'
import Canvas from '@vzy/canvas'

storiesOf('viz/Rect', module)
  .addDecorator(withKnobs)
  .add('example 1', () => {
    const scale = number('scale', 1)
    const rotate = number('rotate', 0)
    return (
      <Canvas>
        <Rect rot={rotate} scale={scale} fill={'indianred'} height={50} width={50} x={25} y={25} />
      </Canvas>
    )
  })
