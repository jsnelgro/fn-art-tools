import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, text } from '@storybook/addon-knobs'
import vzy, { Canvas, MouseProvider as withMouse } from '@vzy/playground'
import Path, { pathHelpers } from '.'

const { moveTo, lineTo, bezierTo, closePath, d, relative, absolute } = pathHelpers

storiesOf('viz/Path', module)
  .addDecorator(withKnobs)
  .add('basic line', () => {
    let opts = { min: 0, max: 100, range: true }
    let x = number('x', 0, opts)
    let y = number('y', 25, opts)
    let rot = number('rotation', 0, {...opts, max: 360})
    let origin = text('origin', 'center')
    return (
      <Canvas style={{background: '#4a4a4a', height:'97vh'}}>
        <Path {...{
          x, y, rot, origin, d:'M 0 0 L 100 0',
          fill:'navajowhite', stroke:'cadetblue'
        }}/>
      </Canvas>
    )
  })
  .add('triangle', () => {
    let opts = { min: 0, max: 100, range: true }
    let x = number('x', 25, opts)
    let y = number('y', 25, opts)
    let rot = number('rotation', 0, {...opts, max: 360})
    let origin = text('origin', 'center')
    return (
      <Canvas style={{border: '1px solid #4a4a4a', height:'97vh'}}>
        <Path {...{
          x, y, rot, origin, d:'M 25 0 L 0 50 L 50 50 z',
          fill:'navajowhite', stroke:'indianred'
        }}/>
      </Canvas>
    )
  })
  .add('using path helpers', () => {
    const Sketch = withMouse((props) => {
      let {mouse} = props
      let path = d([
        moveTo(0, 75),
        bezierTo(25, 50, mouse.x, mouse.y),
        relative(
          lineTo(0, -15),
          lineTo(15, 0),
          lineTo(0, 15),
          lineTo(-5, 0)
        ),
        bezierTo(mouse.x, mouse.y, 80, 75),
        closePath()
      ])
      return (
        <Canvas style={{border: '1px solid #4a4a4a', height:'97vh'}}>
          <Path {...{d: path, fill:'navajowhite', stroke:'indianred'}}>
            <circle cx={mouse.x + 10} cy={mouse.y - 10} r={2} fill={'#4a4a4a'} />
          </Path>
        </Canvas>
      )
    })
    return <Sketch />
  })
