import React, { Component } from 'react'
import Shape from '@vzy/shape'

// src: https://www.w3.org/TR/SVG/paths.html
export const absolute = (...cmds) => cmds.map(cmd => cmd(false))
export const relative = (...cmds) => cmds.map(cmd => cmd(true))
export const d = (...cmds) => {
  if (cmds[0] && Array.isArray(cmds[0])) { cmds = cmds[0] }
  return cmds.map((cmd) => typeof cmd === 'function' ? cmd(false) : cmd)
}
export const moveTo = (x, y) => (r = false) => `${r ? 'm' : 'M'} ${x} ${y}`
export const lineTo = (x, y) => (r = false) => `${r ? 'l' : 'L'} ${x} ${y}`
export const closePath = (r) => (r = false) => `${r ? 'z' : 'Z'}`

export const curveTo = (...args) => (r = false) => {
  if (args.length === 6) {
    // let [x1, y1, x2, y2, x, y] = args
    return `${r ? 'c' : 'C'} ${args.join(' ')}`
  }
  else {
    // let [x2, y2, x, y] = args
    return `${r ? 's' : 'S'} ${args.join(' ')}`
  }
}

export const bezierTo = (...args) => (r = false) => {
  if (args.length === 4) {
    // let [x1, y1, x, y] = args
    return `${r ? 'q' : 'Q'} ${args.join(' ')}`
  }
  else {
    // let [x, y] = args
    return `${r ? 't' : 'T'} ${args.join(' ')}`
  }
}

/**
 * @description Draws an elliptical arc from the current point to (x, y). The size and orientation of the ellipse are defined by two radii (rx, ry) and an x-axis-rotation, which indicates how the ellipse as a whole is rotated relative to the current coordinate system. The center (cx, cy) of the ellipse is calculated automatically to satisfy the constraints imposed by the other parameters. large-arc-flag and sweep-flag contribute to the automatic calculations and help determine how the arc is drawn.
 * @param {[number]} args
 * @param {boolean} r
 */
export const arcTo = (...args) => (r = false) => {
  let prefix = r ? 'a' : 'A'
  if (args.length === 7) {
    let [rx, ry, xRotation, largeArcFlag, sweepFlag, x, y] = args
  }
  else if (args.length === 6) {
    let largeArcFlag = 0
    let [rx, ry, xRotation, sweepFlag, x, y] = args
  }
  else if (args.length === 5) {
    let largeArcFlag = 0
    let sweepFlag = 1
    let [rx, ry, xRotation, x, y] = args
  }
  return `${prefix} ${rx} ${ry} ${xRotation} ${~~largeArcFlag} ${~~sweepFlag} ${x} ${y}`
}

export const pathHelpers = { moveTo, lineTo, closePath, curveTo, bezierTo, arcTo, absolute, relative, d }

const Path = (props) => {
  let {
    x, y, rot, origin, skew, h = 10, w = 10,
    children, hasOwnCoordinateSpace = false,
    d = '',
    ...otherprops
  } = props
  if (Array.isArray(d)) {
    d = d.join(' ')
  }
  return (
    <Shape {...{ x, y, rot, origin, skew,
      h: hasOwnCoordinateSpace ? h : null,
      w: hasOwnCoordinateSpace ? w : null,
      hasOwnCoordinateSpace
    }}>
      <path
        d={d}
        {...otherprops}
      />
      {children}
    </Shape>
  )
}

export default Path
