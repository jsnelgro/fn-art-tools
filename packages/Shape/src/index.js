import React, { Component } from 'react'
import Proptypes from 'prop-types'

const Shape = (props) => {
  let {
    x = 0, y = 0, vbh = 100, vbw = 100,
    rot = 0, origin = 'center', skew = 0, ...otherprops
  } = props

  let gProps = {
    style: {
      transformOrigin: origin,
      transform: [
        `translate3d(${x}px, ${y}px, 0)`,
        `rotate3d(0, 0, 1, ${rot}deg)`,
        `skew(${skew}deg)`,
      ].join(' '),
      ...props.style
    }
  }
  let svgProps = {
    height: props.h,
    width: props.w,
    preserveAspectRatio: 'none',
    overflow: 'visible',
    viewBox: `0 0 ${vbw} ${vbh}`,
  }
  return (props.h && props.w) ?
    (<g {...gProps}><svg {...svgProps} {...otherprops} /></g>) :
    (<g {...gProps} {...otherprops} />)
}

export function withTransform () {
  return (WrappedComponent) => {
    return ({children, x, y, rot, origin, h = null, w = null, ...props}) => (
      <Shape x={x} y={y} rot={rot} origin={origin} h={h} w={w}>
        <WrappedComponent {...props} />
      </Shape>
    )
  }
}

export default Shape
