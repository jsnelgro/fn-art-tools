import React from 'react'
import { storiesOf } from '@storybook/react'
// import { withKnobs, number } from '@storybook/addon-knobs'
// import readme from './README.md'
// import { doc } from '/storybook-helpers'

import Canvas from '.'

storiesOf(`viz/Canvas`, module).add('simple canvas', () => {
  const h = 100
  const w = 100
  // const w = number('width', 100, {
  //   range: true,
  //   min: 100,
  //   max: 300
  // })
  // const h = number('height', 100, {
  //   range: true,
  //   min: 100,
  //   max: 300
  // })

  return (
    <Canvas w={w} h={h}>
      <rect x={0} y={0} height={h} width={w} fill="navajowhite" />
      <g transform="translate(25, 25) rotate(45, 25, 25)">
        <rect height={50} width={50} fill="indianred" />
        <rect y={0} x={0} height={25} width={25} fill="cadetblue" />
        <rect y={25} x={25} height={25 / 2} width={25 / 2} fill="#4a4a4a" />
      </g>
    </Canvas>
  )
})
