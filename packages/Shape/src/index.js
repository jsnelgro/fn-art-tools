import React, { Component } from 'react'
import Proptypes from 'prop-types'

const Shape = (props) => {
  let {
    x, y, vbh = 100, vbw = 100,
    rot = 0, origin = 0, skew = 0, ...otherprops
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

// class Shape extends Component {
//   static propTypes = {
//     children: Proptypes.node,
//     x: Proptypes.number,
//     y: Proptypes.number,
//     rot: Proptypes.number,
//     origin: Proptypes.oneOfType([Proptypes.array, Proptypes.string]),
//     scale: Proptypes.oneOfType([Proptypes.number, Proptypes.array]),
//     skew: Proptypes.oneOfType([Proptypes.number, Proptypes.array]),
//     transforms: Proptypes.arrayOf(Proptypes.string),
//     points: Proptypes.arrayOf(Proptypes.string)
//   }

//   getBBox = () => {
//     if (!this.r) return { width: 0, height: 0, x: 0, y: 0 }
//     return this.r.getBBox()
//   }

//   render() {
//     let { children, x, y, rot, scale, origin, skew, transforms, path, ...p } = this.props
//     let bbox = this.getBBox()
//     const { height, width } = bbox
//     if (typeof scale === 'number') { scale = [scale, scale] }
//     if (typeof skew === 'number') { skew = [skew, skew] }
//     if (origin === 'center') { origin = [height / 2, width / 2] }
//     origin[0] *= scale[0]
//     origin[1] *= scale[1]
//     x -= origin[0]
//     y -= origin[1]
//     const transform = [
//       ...transforms,
//       `translate(${x}, ${y})`,
//       `rotate(${rot}, ${origin[0]}, ${origin[1]})`,
//       `scale(${scale[0]},${scale[1]})`,
//     ].join(' ')
//     return (<g ref={r => (this.r = r)} transform={transform} {...p}>
//       {path ? <path d={path.join(' ')}></path> : null}
//       {children}
//     </g>)
//   }
// }

// Shape.defaultProps = {
//   x: 0,
//   y: 0,
//   rot: 0,
//   scale: [1, 1],
//   skew: 0,
//   origin: 'center',
//   transforms: [],
//   path: []
// }

export default Shape
