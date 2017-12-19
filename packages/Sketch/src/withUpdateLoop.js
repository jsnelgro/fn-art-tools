import React, { Component } from 'react'

/**
 *
 *
 * @export
 * @param {object} [initState={}]
 * @param {function} updateFn
 * @returns {function}
 */
export default function withUpdateLoop(initState = {}, updateFn) {
  updateFn = updateFn || (async s => s)
  return WrappedComponent =>
    class UpdateLoop extends Component {
      animationFrame = null

      constructor(props) {
        super(props)
        const stateFromProps = typeof initState === 'function' ? initState({ ...props }) : initState
        for (let k in stateFromProps) {
          if (typeof stateFromProps[k] === 'function') {
            stateFromProps[k] = this.actionCreator(stateFromProps[k])
          }
        }
        this.state = { __delay__: 0, t: 0, dt: 0, ...stateFromProps }
      }

      actionCreator = action => {
        return async () => {
          const nxtState = await action(this.state)
          this.setState(nxtState)
        }
      }

      componentDidMount() {
        this.onUpdate(updateFn)
      }

      componentWillUnmount() {
        if (this.animationFrame) {
          window.cancelAnimationFrame(this.animationFrame)
        }
      }

      onUpdate = updateFn => {
        this.setState(
          prevState => ({
            ...updateFn({ ...prevState, ...this.props }),
            t: Date.now(),
            dt: Date.now() - prevState.t
          }),
          () => {
            if (this.state.__stop__) {
              window.cancelAnimationFrame(this.animationFrame)
            } else if (this.state.__delay__) {
              window.setTimeout(() => {
                this.animationFrame = window.requestAnimationFrame(() => this.onUpdate(updateFn))
              }, Math.max(this.state.__delay__ || 0))
            } else {
              this.animationFrame = window.requestAnimationFrame(() => this.onUpdate(updateFn))
            }
          }
        )
      }

      render() {
        return <WrappedComponent setState={this.setState} {...this.props} {...this.state} />
      }
    }
}
