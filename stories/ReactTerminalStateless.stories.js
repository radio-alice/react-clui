import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import Terminal from 'Terminal'

storiesOf('Terminal', module).add('render terminal', () => (
  <Terminal inputStr={'initial val'} />
))
