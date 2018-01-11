import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, text } from '@storybook/addon-knobs'
import vzy from '.'

storiesOf('Playground', module)
  .addDecorator(withKnobs)
  .add('fun!', () => {
    return <div>{'TODO write some fun vizzies with the playground package'}</div>
  })