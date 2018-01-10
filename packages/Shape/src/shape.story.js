import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, text } from '@storybook/addon-knobs'
import Canvas from '@vzy/canvas'
import Shape, { withTransform } from '.'

storiesOf('viz/Shape', module)
  .addDecorator(withKnobs)
  .add('Basic Shape HOC', () => {
    const opts = { range: true, min: 0, max: 100 }
    const x = number('x', 15, opts)
    const y = number('y', 15, opts)
    const rot = number('rotation', 15, {...opts, max: 360})
    const skew = number('skew', 0, {...opts, max: 360})
    const origin = text('origin', 'center')

    return (
    <Canvas>
      <Shape fill={'cadetblue'} x={x} y={y} rot={rot} origin={origin} skew={skew}>
        <rect height={25} width={25} />
      </Shape>
    </Canvas>
    )
  })
  .add('Compound Shape', () => {
    const opts = { range: true, min: 0, max: 100 }
    const x = number('x', 15, opts)
    const y = number('y', 15, opts)
    const rot = number('rotation', 15, {...opts, max: 360})
    const skew = number('skew', 0, {...opts, max: 360})
    const origin = text('origin', 'center')

    return (
    <Canvas>
      <Shape x={x} y={y} rot={rot} origin={origin} skew={skew}>
        <rect height={25} width={25} fill={'cadetblue'} />
        <circle r={2} cx={0} cy={0} fill={'indianred'} />
      </Shape>
    </Canvas>
    )
  })
  .add('Nested Shapes', () => {
    const opts = { range: true, min: 0, max: 100 }
    const x = number('x', 36, opts)
    const y = number('y', 36, opts)
    const rot = number('rotation', 0, {...opts, max: 360})
    const origin = text('origin', 'center')

    return (
    <Canvas style={{width: '100%', height:'97vh'}}>
      <rect height={100} width={100} fill={'#4a4a4a'}/>
      <Shape x={x} y={y} rot={rot} origin={origin}>
        <rect x={0} y={0} height={25} width={25} fill={'navajowhite'}/>
        <Shape y={Math.min(Math.max((y/3) - 10, -2), 3)} x={Math.min(Math.max((x/3) - 12, -4), 4)}>
          <rect x={5} y={4} height={8} width={5} fill={'cadetblue'}/>
          <rect x={15} y={4} height={8} width={5} fill={'cadetblue'}/>
        </Shape>
        <rect x={5} y={16} height={5} width={15} fill={'indianred'}/>
      </Shape>
    </Canvas>
    )
  })
  .add('Nested Shapes with new coordinate space', () => {
    const opts = { range: true, min: 0, max: 100 }
    const x = number('x', 36, opts)
    const y = number('y', 36, opts)
    const h = number('height', 25, opts)
    const w = number('width', 25, opts)
    const rot = number('rotation', 0, {...opts, max: 360})
    const skew = number('skew', 0, {...opts, min: -90, max: 90})
    const origin = text('origin', 'center')

    return (
      <Canvas style={{border: '1px solid #4a4a4a', margin: '0 auto', height:'97vh'}}>
        <Shape h={h} w={w} x={x} y={y} rot={rot} origin={origin} skew={skew}>
          <rect fill={'navajowhite'} height={100} width={100} />
          <Shape name={'eyes'}
            x={0} y={35}
            fill={'#4a4a4a'} stroke={'skyblue'} strokeWidth={3}
          >
            <Shape skew={-10}><circle cx={30} r={10} cy={0} /></Shape>
            <Shape skew={10}><circle cx={70} r={10} cy={0} /></Shape>
          </Shape>
          <Shape name={'mouth'} x={20} y={60} fill={'salmon'}
            stroke={'darksalmon'} strokeWidth={3}
          >
            <path d="M-2,0 a1,1 0 0,0 65,0 Z" />
          </Shape>
          <Shape name={'hat'}
            y={0}
            fill={'salmon'} stroke={'indianred'} strokeWidth={2}>
            <rect x={5} y={-10} height={25} width={90} />
            <rect height={25} width={100} />
            <Shape x={12} y={0} skew={-25}>
              <rect height={50} width={25} />
            </Shape>
          </Shape>
        </Shape>
      </Canvas>
    )
  })
