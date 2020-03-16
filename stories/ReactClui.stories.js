import React from 'react'
import { storiesOf } from '@storybook/react'
import Terminal from 'Terminal'

storiesOf('Terminal', module).add('render terminal', () => (
  <Terminal inputStr={'initial val'} />
))
storiesOf('Terminal', module).add('echo command', () => (
  <Terminal inputStr={'echo "Bernie 2020"'} />
))
