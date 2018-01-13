
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Polygon from '.'

storiesOf('Polygon', module)
  .addDecorator(withKnobs)
  .add('example 1', () => {
    const txt = text('inner txt', 'I am a Polygon component!')
    return (
      <Polygon txt={txt}>
      </Polygon>
    )
  })
