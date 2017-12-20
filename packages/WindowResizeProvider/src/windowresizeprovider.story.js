import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import withWindowSize from '.'
import Canvas from '@vzy/canvas'
import Ellipse from '@vzy/ellipse'
import * as _ from '@vzy/utils'

storiesOf('WindowResizeProvider', module)
  .addDecorator(withKnobs)
  .add('resize me horizontally!', () => {
    const numOfNodes = number('number of nodes', 33)
    const WindowResizeProvider = withWindowSize((props) => {
      let { h, w } = props.windowSize
      h = _.line(h, 300, 900, 0, 100)
      w = _.line(w, 400, 1680, 0, 100)
      return (
      <Canvas style={{maxHeight: '90vh'}}>
        <rect x={0} y={0} fill={'papayawhip'} height={100} width={100} />
        {_.range(numOfNodes).map((i) => (
          <Ellipse
            rot={(w*++i)}
            origin={[5*Math.log(i), 5*Math.log(i)]}
            x={50}
            y={50}
            r={0.75*Math.log(i)}
            fill={_.randHsla((w+100)+i*4, 38, 50)}
          />
        ))}
      </Canvas>)
    })
    return (<WindowResizeProvider />)
  })
