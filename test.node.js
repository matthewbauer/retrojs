var System = require('systemjs')
require('./config')
System.import('test').then(console.log, console.error)
