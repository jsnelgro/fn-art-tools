import React, { Component } from 'react'
import Proptypes from 'prop-types'
import Path, { pathHelpers } from '@vzy/path'
const { d, moveTo, lineTo, relative, closePath } = pathHelpers

export const isoTriPath = (x, y, w, h) => d(
  moveTo(x, y - (h/2)),
  lineTo(x + (w/2), y + (h/2)),
  lineTo(x - (w/2), y + (h/2)),
  closePath()
)

export const rightTriPath = (x, y, w, h) => d(
  moveTo(x, y),
  lineTo(x + w, y + h),
  lineTo(x, y + h),
  closePath()
)

export const freeTriPath = (p1, p2, p3) => d(
  moveTo(...p1),
  lineTo(...p2),
  lineTo(...p3),
  closePath()
)

const Triangle = (props) => {
  let { h, w, x, y, isRight, p1, p2, p3, ...other } = props
  let cmd = isRight ?
    rightTriPath :
    p1 && p2 && p3 ?
      (x = p1) && (y = p2) && (w = p3) && freeTriPath :
      isoTriPath
  return (<Path {...{d: cmd(x, y, w, h), ...other}} />)
}

// Triangle.propTypes = {
//   isRight: Proptypes.bool,
// }

export default Triangle
