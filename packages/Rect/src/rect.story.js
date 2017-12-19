
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Rect from '.'

storiesOf('Rect', module)
  .addDecorator(withKnobs)
  .add('example 1', () => {
    const txt = text('inner txt', 'I am a Rect component!')
    return (
      <Rect txt={txt}>
      </Rect>
    )
  })
