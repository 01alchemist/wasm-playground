#!/bin/env node

const args = process.argv.splice(2)

async function initModule() {
  const wasmPath = path.resolve(__dirname, '../build', `${args[0]}.wasm`)
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
  if(args[1] && exports[args[1]]) {
    exports[args[1]]()
  }
})
