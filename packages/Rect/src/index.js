// TODO: rewrite after rewriting Shape class...

import React, { Component } from 'react'
import Shape from '@vzy/shape'

const Rect = (props) => {
  const { children, ...other } = props
  let _x, _y;
  if (!props.origin) {
    _x = props.width / 2
    _y = props.height / 2
  }
  return (
  <Shape {...other} width={props.width} height={props.height}>
    <rect x={_x || 0} y={_y || 0} height={100} width={100} />
    {children}
  </Shape>)
}

export default Rect
