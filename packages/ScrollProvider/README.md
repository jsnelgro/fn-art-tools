ScrollProvider
==========

Either tracks page scrolling, or virtualized scrolling

```js
options = {
  /**
   * @desc whether should reflect actual page scroll, or a virtual emulated scroll (gesture)
  */
  virtual: bool,

  /**
   * @desc an optional element to attach the scroll listener to
   * @default window
  */
  element: window,

  /**
   * @desc scroll direction follows direction or is opposite
  */
  naturalScrolling: false,

  /**
   * @desc how much acceleration it takes to make the scroll move
   */
  mass: 0.5,

  /**
   * @desc restrict scrolling to one direction
   * */
  restrict: 'x' || 'y'
}
```