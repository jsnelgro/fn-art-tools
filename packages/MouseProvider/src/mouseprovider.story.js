
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import MouseProvider from '.'

storiesOf('MouseProvider', module)
  .addDecorator(withKnobs)
  .add('example 1', () => {
    const txt = text('inner txt', 'I am a MouseProvider component!')
    return (
      <MouseProvider txt={txt}>
      </MouseProvider>
    )
  })
