
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import WindowResizeProvider from '.'

storiesOf('WindowResizeProvider', module)
  .addDecorator(withKnobs)
  .add('example 1', () => {
    const txt = text('inner txt', 'I am a WindowResizeProvider component!')
    return (
      <WindowResizeProvider txt={txt}>
      </WindowResizeProvider>
    )
  })
