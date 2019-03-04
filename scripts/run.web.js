var memory = new WebAssembly.Memory({
  initial: 160,
})

const { wasmFile, wasmFunc } = parseHash(location.hash)

async function init() {
  fetch(`./build/${wasmFile}.wasm`)
    .then(response => response.arrayBuffer())
    .then(buffer =>
      WebAssembly.instantiate(buffer, {
        env: {
          memory,
          abort: (filename, line, column) => {
            throw Error(
              `abort called at ${
                filename ? filename + ':' : ''
              }${line}:${column}`
            )
          },
        },
      })
    )
    .then(async module => {
      console.log(module.instance.exports)
      const exports = module.instance.exports
      if (wasmFunc && exports[wasmFunc]) {
        console.log('Calling:', exports[wasmFunc])
        console.log(exports[wasmFunc]())
      }
    })
}
init()
async function sleep(time = 1000) {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function parseHash(str) {
  const args = str.substring(1).split(',')

  return {
    wasmFile: args[0],
    wasmFunc: args[1],
  }
}
