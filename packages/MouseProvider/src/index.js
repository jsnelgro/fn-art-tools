import React, { Component } from 'react'

export function withMouse (parent) {
  return (WrappedComponent) => class MouseProvider extends Component {

    state = { x: 0, y: 0, dx: 0, dy: 0, event: null }

    componentDidMount() {
      this.parent = parent
      if (this.parent === window) {
        this.parent.addEventListener('mousemove', this.mouseMove) 
      }
    }

    componentWillUnmount() {
      if (this.parent === window) {
        this.parent.removeEventListener('mousemove', this.mouseMove) 
      }
    }

    getSVGCoords = (viewportEl, clientX, clientY) => {
      // NOTE: look up if this is expensive && cache point if is
      let point = viewportEl.createSVGPoint()
      point.x = clientX
      point.y = clientY
      let cursor = point.matrixTransform(viewportEl.getScreenCTM().inverse())
      return {x: cursor.x, y: cursor.y}
    }

    isSVGContext = (ev) => {
      return ev.target.nodeName === 'svg' || ev.target.nearestViewportElement
    }

    mouseMove = (e) => {
      let x = this.state.x
      let y = this.state.y
      if (this.isSVGContext(e)) {
        let viewportEl = e.target.nearestViewportElement || e.target
        let coords = this.getSVGCoords(viewportEl, e.clientX, e.clientY)
        x = coords.x
        y = coords.y
      }
      else {
        if (this.parent === window) {
          x = e.pageX
          y = e.pageY
        } else {
          x = e.pageX - e.target.offsetLeft
          y = e.pageY - e.target.offsetTop
        }
      }
      this.setState({
        x: x,
        y: y,
        dx: e.movementX,
        dy: e.movementY,
        event: e.nativeEvent
      })
    }

    render () {
      return (
        <WrappedComponent onMouseMove={this.mouseMove} mouse={this.state} {...this.props} />
      )
    }
  }
}

export default withMouse(window)
