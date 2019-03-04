#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const minimist = require('minimist')
const { spawnSync } = require('child_process')

const options = minimist(process.argv.slice(2))

const program = 'wat2wasm'
const args = [
  '--no-check',
  `src/${options._[0]}.wat`,
  '-o',
  `build/${options._[0]}.wasm`,
  '--enable-simd',
]
spawnSync(program, args)

if (options.start) {
  const result = spawnSync('yarn', ['start', options._[0], options.start || ''])
  console.log(result.output.toString())
}
