import React, { Component } from 'react'
import { round, Vector as vec } from '@vzy/utils'

// class Mover {
//   constructor () {
//     this.state = {
//       accel: [0, 0], vel: [0, 0], pos: this.props.pos || [0, 0]
//     }
//   }

//   move = () => {
//     this.setState((prevState) => {
//       // add forces to acceleration
//       let mass = this.props.mass
//       let forces = this.props.forces
//       let acc = vec.add(vec.create(prevState.acc), ...forces)
//       let vel = vec.add(vec.create(prevState.vel), vec.mult(acc, mass))
//       let pos = vec.add(vec.create(prevState.pos), vel)
//       acc = vec.create(0,0,0)
//       return { ...prevState, acc, vel, pos }
//     }, () => {
//       if (round(this.state.vel, 2) !== 0) {
//         this.move()
//       }
//     })
//   }
  
//   componentWillReceiveProps (newProps) {
//     if (newProps.forces && Array(newProps.forces).isArray()) {
//       this.move()
//     }
//   }

//   applyForce = (vec) => {
//     vec
//   }
// }

export function withScroll (parent) {
  return (WrappedComponent) => class ScrollProvider extends Component {
    state = { x: 0, y: 0, dx: 0, dy: 0 }

    componentDidMount () {
      document.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount () {
      document.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = (ev) => {
      this.setState({
        x: window.pageXOffset,
        y: window.pageYOffset,
        dx: window.pageXOffset - this.state.x,
        dy: window.pageYOffset - this.state.y
      })
    }

    render () {
      return (<WrappedComponent scroll={this.state} {...this.props} />)
    }
  }
}

export default withScroll(window)
