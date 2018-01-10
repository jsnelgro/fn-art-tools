// @flow
import React from 'react'
import PropTypes from 'prop-types'

// type Props = {
//   /** width */
//   w?: number,
//   /** height */
//   h?: number
// }

const Canvas = (props) => {
  const { w, h, ...other } = props
  return (
    <svg
      // style={{border:'1px dotted red'}}
      viewBox={`0 0 ${w} ${h}`}
      // preserveAspectRatio={'xMidYMid meet'}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      {props.children}
    </svg>
  )
}

Canvas.propTypes = {
  h: PropTypes.number,
  w: PropTypes.number,
  children: PropTypes.any
}
Canvas.defaultProps = {
  w: 100,
  h: 100,
  children: []
}

export default Canvas
