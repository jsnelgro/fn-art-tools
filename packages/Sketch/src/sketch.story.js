import React from 'react'
import { storiesOf } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'
// import { withReadme } from 'storybook-readme'
// import readme from './README.md'
// import hocs from '/build/hocs'
// import viz from '/build/viz'
// const { Sketch } = hocs
// const { Canvas } = viz

// const Story = props => {
//   return (
//     <Sketch
//       init={{ x: 0, y: 0 }}
//       update={s => {
//         return { ...s, x: (s.x + 1) % 100 }
//       }}
//       view={p => {
//         return (
//           <Canvas w={100} h={100}>
//             <rect x={p.x} y={25} height={50} width={50} fill="indianred" />
//           </Canvas>
//         )
//       }}
//     />
//   )
// }

// storiesOf(`hocs/Sketch`, module).add(
//   'simple sketch',
//   withInfo({
//     text: `
//     ~~~js
//     const init = {x: 0, y: 0}

//     const update= (s) => {
//       return { ...s, x: (s.x + 1) % 100 }
//     }

//     const view = (p) => {
//       return (
//         &lt;Canvas w={100} h={100}>
//           &lt;rect x={p.x} y={25} height={50} width={50} fill='indianred' />
//         &lt;/Canvas>
//       )
//     }
//     ~~~
//     `,
//     inline: true,
//     header: false,
//     source: true
//   })(withReadme(readme, Story))
// )
