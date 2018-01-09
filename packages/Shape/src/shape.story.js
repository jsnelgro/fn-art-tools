import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, text } from '@storybook/addon-knobs'
import Canvas from '@vzy/canvas'
import Shape, { withTransform } from '.'

// import { range } from '@vzy/utils'
// import readme from './README.md'
// import { doc } from '/storybook-helpers'

// const Polygon = withTransform()(({sides, radius}) => {
//   const angle = 360 / sides
//   const vertexIndices = range(sides)
//   const offsetDeg = 90 - ((180 - angle) / 2)
//   const offset = degreesToRadians(offsetDeg)
//   const points = pts(sides, radius).map(({ r, theta }) => [
//     cx + r * Math.cos(theta), 
//     cy + r * Math.sin(theta),
//   ])
//   .join(' ')
//   return <polygon points={points} />
// })

// const Rect = withTransform()((...props) => {
//   return <rect height={100} width={100} {...props} />
// })

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
          <rect fill={'salmon'} height={100} width={100} />
          <circle fill={'thistle'} cx={50} cy={50} r={25} />
          {/* <Shape></Shape> */}
        </Shape>
      </Canvas>
    )
  })

// storiesOf('viz/Shape', module)
//   .addDecorator(withKnobs)
//   .add(
//     'kitchen sink',
//     () => {
      // const opts = { range: true, min: 0, max: 100 }
//       const x = number('x', 15, opts)
//       const y = number('y', 45, opts)
//       const ox = number('origin x', 25, {...opts, min: -50 })
//       const oy = number('origin y', 25, {...opts, min: -50 })
//       const rot = number('rotate', 75, {...opts, max: 360 })
//       const scale = number('scale', 0.5, {...opts, max: 3, step: 0.01})
//       const skx = number('skew x', 0, {...opts, min: -180, max: 90 })
//       const sky = number('skew y', 0, {...opts, min: -180, max: 90 })
//       const tfms = text('transforms', '')
//       return (
//         <Canvas>
//           <Shape
//             origin={[ox, oy]}
//             x={x} y={y}
//             rot={rot}
//             scale={scale}
//             skew={[skx, sky]}
//             transforms={[tfms]}
//             >
//             <rect height={50} width={50} fill="#4a4a4a" />
//             <rect x={5} height={25} width={25} fill="navajowhite" />
//             <circle cx={ox} cy={oy} r={1/scale} fill="indianred" />
//           </Shape>
//         </Canvas>
//       )
//     })
