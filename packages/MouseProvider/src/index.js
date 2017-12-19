
import React, { Component } from 'react'

export function withMouse (parent) {
  return (WrappedComponent) => class MousePosition extends Component {

    state = { x: 0, y: 0, dx: 0, dy: 0, event: null }

    componentDidMount() {
      (parent || window).addEventListener('mousemove', this.mouseMove)
    }

    componentWillUnmount() {
      (parent || window).removeEventListener('mousemove', this.mouseMove)
    }

    mouseMove = (e) => {
      this.setState({
        x: e.pageX,
        y: e.pageY,
        dx: e.movementX,
        dy: e.movementY,
        event: e })
    }

    render () {
      return <WrappedComponent mouse={this.state} {...this.props} />
    }
  }
}

class MouseProvider extends Component {

  render () {
    const { txt } = this.props
    return (<div>{txt}</div>)
  }

}

export default MouseProvider
