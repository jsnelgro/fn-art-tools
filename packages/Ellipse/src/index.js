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
      w: hasOwnCoordinateSpace ? w : null
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


// class Ellipse extends Component {
//   static propTypes = {
//     children: Proptypes.node,
//     x: Proptypes.number,
//     y: Proptypes.number,
//     rot: Proptypes.number,
//     origin: Proptypes.oneOfType([Proptypes.array, Proptypes.string]),
//     scale: Proptypes.oneOfType([Proptypes.number, Proptypes.array]),
//     skew: Proptypes.oneOfType([Proptypes.number, Proptypes.array]),
//     transforms: Proptypes.arrayOf(Proptypes.string)
//   }

//   render() {
//     // let { children, x, y, rot, scale, origin, skew, transforms, ...p } = this.props
//     let { x, y, r, rx, ry, origin, scale } = this.props
//     rx = rx || r
//     ry = ry || r
//     const path = [
//       'm', 0, 0,
//       'a', `${rx},${rx}`, 0, `${1},${0}`, `${rx * 2},${0}`,
//       'a', `${ry},${ry}`, 0, `${1},${0}`, `-${ry * 2},${0}`
//     ].map(String)
//     if (origin === 'center') { origin = [0,0] }
//     return (<Shape {...this.props} path={path} origin={origin} >
//       {/* <ellipse cx={0} cy={0} rx={r || rx} ry={r || ry} /> */}
//       {/* <path d={points.map(String).join(' ')}></path> */}
//       {this.props.children}
//       </Shape>)
//   }
// }

// Ellipse.defaultProps = {
//   x: 0, y: 0, r: 1, rx: null, ry: null, origin: 'center', scale:[1,1]
// }

// export default Ellipse
