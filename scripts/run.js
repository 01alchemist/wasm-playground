#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const minimist = require('minimist')

const options = minimist(process.argv.slice(2))

console.log(options);

const args = process.argv.slice(2)
const requiredMemory = options.memory ? parseInt(options.memory) : 50
const _64KB = 64 * 1024
const REQUIRED_MB = 1024 * 1024 * requiredMemory // 50 MB
const REQUIRED_PAGES = Math.ceil(REQUIRED_MB / _64KB)
const memory = new WebAssembly.Memory({
  initial: REQUIRED_PAGES,
  maximum: REQUIRED_PAGES,
  shared: true,
})

async function initModule() {
  const wasmPath = path.resolve(__dirname, '../build', `${options._[0]}.wasm`)
  const buffer = fs.readFileSync(wasmPath)
  const results = await WebAssembly.instantiate(buffer, {
    env: {
      memory,
      abort: (filename, line, column) => {
        throw Error(
          `abort called at ${filename ? filename + ':' : ''}${line}:${column}`
        )
      },
    },
  })
  return results.instance.exports
}

initModule().then(exports => {
  if (options._[1] && exports[options._[1]]) {
    exports[options._[1]]()
  }
})
