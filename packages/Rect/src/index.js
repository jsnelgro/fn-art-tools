import React, { Component } from 'react'
import Shape from '@vzy/shape'

const Rect = (props) => {
  let {
    x, y, rot, origin, skew, h = 10, w = 10,
    children, hasOwnCoordinateSpace = false, ...otherprops
  } = props

  return (
    <Shape {...{ x, y, rot, origin, skew,
      h: hasOwnCoordinateSpace ? h : null,
      w: hasOwnCoordinateSpace ? w : null,
      hasOwnCoordinateSpace
    }}>
      <rect
        height={hasOwnCoordinateSpace ? 100 : h}
        width={hasOwnCoordinateSpace ? 100 : w}
        {...otherprops}
      />
      {children}
    </Shape>
  )
}

export default Rect
