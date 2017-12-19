import React from 'react'
import PropTypes from 'prop-types'
import withUpdateLoop from './withUpdateLoop.js'

const Sketch = ({ init, update, view }) => {
  const Sketch = withUpdateLoop(init, update)(view)
  return <Sketch />
}

Sketch.propTypes = {
  init: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  update: PropTypes.func.isRequired,
  view: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
}

export default Sketch
