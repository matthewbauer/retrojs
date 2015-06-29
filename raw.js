export const build = false

export function fetch (load) {
  if (load.address.substr(0, 8) === 'file:///') {
    return System.import('fs').then(function (fs) {
      return new Promise(function (resolve, reject) {
        fs.readFile(load.address.substr(7), function (err, data) {
          if (err) {
            reject(err)
          } else {
            load.metadata.buffer = data
            resolve('')
          }
        })
      })
    })
  } else {
    return System.import('fetch').then(function (_fetch) {
      return window.fetch(load.address)
    }).then(function (data) {
      return data.arrayBuffer()
    }).then(function (buffer) {
      load.metadata.buffer = buffer
      return ''
    })
  }
}

export function instantiate (load) {
  return load.metadata.buffer
}
