import React from 'react'
import Shape from '@vzy/shape'
import Path, { pathHelpers } from '@vzy/path'
const { d, moveTo, lineTo, closePath } = pathHelpers

const Polygon = (props) => {
  let { x, y, w = 10, h = 10, sides = 6, ...other } = props
  let points = [...Array(sides + 1).keys()].map((i) => {
    const angle = Math.PI / 2 + 2 * Math.PI * i / sides
    return [
      (w / 2) * Math.cos(angle),
      (h / 2) * Math.sin(angle)
    ]
  })

  const path = d([
    moveTo(points[0][0], points[0][1]),
    ...points.map(p => lineTo(...p)),
    closePath()
  ])
  return (
    <Path d={path} {...props} />
  )
}

export default Polygon
