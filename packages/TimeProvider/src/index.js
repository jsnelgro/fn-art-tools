import React, { Component } from 'react'
import 'raf'

export function withTime (parent) {
  return (WrappedComponent) => class TimeProvider extends Component {
    state = {
      t: Date.now(),
      et: 0,
      dt: 0,
      paused: false
    }

    update = () => {
      if (this.state.paused) {
        return
      }

      this.setState((prevState) => {
        let now = Date.now()
        return {
          t: now,
          et: prevState.et + 1,
          dt: now - prevState.t,
          paused: prevState.paused
        }
      }, () => !this.state.paused ? window.requestAnimationFrame(this.update) : null)
    }

    componentWillReceiveProps (nxtProps) {
      if (typeof nxtProps.paused === 'boolean') {
        this.setState({paused: nxtProps.paused})
        window.requestAnimationFrame(this.update)
      }
    }

    componentDidMount () {
      this.setState({paused: this.props.paused})
      window.requestAnimationFrame(this.update)
    }

    componentWillUnmount () {
      window.cancelAnimationFrame(this.update)
    }

    render () {
      let {paused, ...otherProps} = this.props
      return <WrappedComponent time={this.state} {...otherProps} />
    }
  }
}

export default withTime()
