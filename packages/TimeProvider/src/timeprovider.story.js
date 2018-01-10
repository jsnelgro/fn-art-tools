import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'

import timeHoc, { withTime } from '.'
import Canvas from '@vzy/canvas'

storiesOf('TimeProvider', module)
  .addDecorator(withKnobs)
  .add('props with pause toggle', () => {
    const paused = boolean('paused', true)
    const TimeProvider = timeHoc((props) => {
      return <div>{JSON.stringify(props)}</div>
    })
    return (<TimeProvider paused={paused} />)
  })
  .add('with throttling', () => {
    const paused = boolean('paused', true)
    const delay = number('throttle interval', 300)
    const TimeProvider = withTime(delay)((props) => {
      return <div>{JSON.stringify(props)}</div>
    })
    return <TimeProvider paused={paused} />
  })
  .add('time-based scene', () => {
    const TimeProvider = timeHoc((props) => {
      const { time } = props
      return (
        <Canvas>
          {[...Array(50).keys()].map((i) => {
            return (
              <rect
              key={i}
              style={{transformOrigin: '50% 50%'}}
              transform={`rotate(${time.et + (i*10)})`}
              x={2 * i + Math.sin(time.t / 1000) * 1}
              y={2 * i + Math.cos(time.t / 1000) * 1}
              height={10}
              width={10}
              stroke={'skyblue'}
              fill={'cadetblue'}
            />)
          })}
        </Canvas>
      )
    })
    return <TimeProvider paused={false} />
  })
