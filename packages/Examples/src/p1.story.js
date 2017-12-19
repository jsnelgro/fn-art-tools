import React from 'react'
import { storiesOf } from '@storybook/react'
import Sketch from '@vzy/Sketch'
import Canvas from '@vzy/canvas'
import * as _ from '@vzy/Utils'

const Story1 = () => {
  const state = {
    nodes: _.range(10).map(i => ({
      id: i,
      x: i * 10 + 5,
      y: _.random(0, 50),
      color: _.randHsla(null, 50, _.random(25, 75), _.random(0.75, 0.80)),
      r: _.random(2, 5),
      neighbors: _.range(~~_.random(0, 4)).map(i => ~~_.random(0, 10))
    }))
  }

  const update = (s) => {
    return {...s,
      nodes: s.nodes.map(n => ({
        ...n,
        y: n.y + (0.020 * n.id * Math.sin((1+ s.t * n.id) / 1750)),
        x: n.x - (0.020 * n.id * Math.cos((1+ s.t * n.id) / 1750))
      })
      )
    }
  }

  const view = (props) => {
    const { nodes } = props
    return <Canvas>
    <rect height={'100%'} width={'100%'} fill={'#333333'} />
    {
      nodes.map(n => {
        return n.neighbors.map(nid => {
          let p = [
            'M', n.x, n.y,
          'L', nodes[nid].x, nodes[nid].y
          ].join(' ')
          return <path key={_.random(100)} strokeWidth={_.normalize(n.r, 2, 5)} stroke={n.color} d={p} />
        })
      })
    }
    {
      nodes.map(d => (
        <circle
          onClick={() => {
            let n = [...nodes]
            n[d.id].color = _.randHsla(null, 50, 50, _.random(0.5, 1))
            update({...props, nodes: n})
          }}
          key={d.id}
          r={d.r} cx={d.x} cy={d.y} fill={d.color}></circle>)
      )
    }
    </Canvas>
  }

  return <Sketch init={state} update={update} view={view} />
}


const makeGrid = (h, w) => {
  return [...Array(h).keys()].map(y => [...Array(w).keys()].map((_, x) => [x, y]))
}

const Story2 = () => {
  const state = {
    h: 100, w: 100,
    grid: makeGrid(4, 4),
    rGuy: {
      w: 5, h: 5
    }
  }

  const update = (s) => {
    let r = _.random(10, 10)
    return {...s, rGuy: {w: 10, h: 10} }
  }

  const render = (props) => {
    const { grid, h, w, rGuy } = props
    let BoxGrid = grid.map(row => {
      return row.map(([x, y]) => {
        return <rect
          key={'' + x + y}
          fill={_.randHsla(y*10, 50, 60-x*10)}
          x={x * rGuy.w} y={y * rGuy.h} height={rGuy.h} width={rGuy.w}
        >{''+ x + ' ' + y}</rect>
      })
    })
    return (<Canvas>
      {BoxGrid}
    </Canvas>)
  }

  return <Sketch init={state} update={update} view={render} />
}

storiesOf('examples', module)
  .add('story 1', Story1)
  .add('story 2', Story2)