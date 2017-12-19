#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const componentName = process.argv[process.argv.length - 1]
if (!componentName || componentName.includes('/')) {
  console.error('must provide a vaild component name')
  return 1
}

const componentTemplate = `
import React, { Component } from 'react'

class ${componentName} extends Component {

  render () {
    const { txt } = this.props
    return (<div>{txt}</div>)
  }

}

export default ${componentName}
`

const storybookTemplate = `
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import ${componentName} from '.'

storiesOf('${componentName}', module)
  .addDecorator(withKnobs)
  .add('example 1', () => {
    const txt = text('inner txt', 'I am a ${componentName} component!')
    return (
      <${componentName} txt={txt}>
      </${componentName}>
    )
  })
`

const readmeTemplate = `
${componentName}
==========

My super awesome ${componentName} component!
`

const packageTemplate = `
{
  "name": "@vzy/${componentName.toLowerCase()}",
  "version": "0.0.1",
  "description": "My super awesome ${componentName} component!",
  "main": "dist/index.js",
  "module": "src/index.js",
  "author": "John Snelgrove <johnny.snelgrove@gmail.com> (http://jsnelgro.me)",
  "peerDependencies": {
    "react": "^16.2.0"
  },
  "devDependencies": {
    "prop-types": "^15.6.0",
    "raf": "^3.4.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
`

const writeFiles = async (dirpath) => {
  await fs.mkdir(dirpath, err => err ? console.error(err) : null)
  await fs.mkdir(path.join(dirpath, 'src'), err => err ? console.error(err) : null)
  await fs.writeFile(
    path.join(dirpath, 'src/index.js'),
    componentTemplate, err => err ? console.error(err) : null
  )
  await fs.writeFile(
    path.join(dirpath, `src/${componentName.toLowerCase()}.story.js`),
    storybookTemplate, err => err ? console.error(err) : null
  )
  await fs.writeFile(
    path.join(dirpath, 'package.json'),
    packageTemplate, err => err ? console.error(err) : null
  )
  await fs.writeFile(
    path.join(dirpath, 'README.md'),
    readmeTemplate, err => err ? console.error(err) : null
  )
  console.log('success! Your new component can be found at:')
  console.log(dirpath)
}

// create dir and write files
let dirpath = path.resolve(process.cwd(), 'packages', `${componentName}`)
// console.log('dirpath', dirpath)

writeFiles(dirpath)