import React, { Component } from 'react'
import Shape from '@vzy/shape'

const Ellipse = (props) => {
  let {
    x, y, rot, origin, skew, h = 10, w = 10,
    children, hasOwnCoordinateSpace = false, r = 10,
    ...otherprops
  } = props

  hasOwnCoordinateSpace = hasOwnCoordinateSpace || (props.h && props.w)
  return (
    <Shape {...{ x, y, rot, origin, skew,
      h: hasOwnCoordinateSpace ? h : null,
      w: hasOwnCoordinateSpace ? w : null,
      hasOwnCoordinateSpace
    }}>
      <circle
        cy={hasOwnCoordinateSpace ? 50 : 0}
        cx={hasOwnCoordinateSpace ? 50 : 0}
        r ={hasOwnCoordinateSpace ? 50 : r}
        {...otherprops}
      />
      {children}
    </Shape>
  )
}

export default Ellipse
