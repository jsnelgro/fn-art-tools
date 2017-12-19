// TODO: write me

import React, { Component } from 'react'

export function withWindowSize () {
  return (WrappedComponent) => class WindowSize extends Component {

    state = { h: window.innerHeight, w: window.innerWidth, event: null }

    componentDidMount() {
      window.addEventListener('resize', this.windowResize)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.windowResize)
    }

    windowResize = (e) => {
      this.setState({ h: window.innerHeight, w: window.innerWidth, event: e })
    }

    render() {
      return <WrappedComponent windowSize={this.state} {...this.props} />
    }
  }
}

class WindowResizeProvider extends Component {

  render () {
    const { txt } = this.props
    return (<div>{txt}</div>)
  }

}

export default WindowResizeProvider
