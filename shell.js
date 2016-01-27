'format global'
'exports Module'
var ENVIRONMENT_IS_WEB = true
var ENVIRONMENT_IS_NODE = false
var ENVIRONMENT_IS_SHELL = false
var Module = {
  print: function () {},
  printErr: function () {},
  noExitRuntime: true,
  noInitialRun: true,
  memoryInitializerRequest: {
    addEventListener: function(load, useRequest) {
      var data = require('fs').readFileSync(__dirname + '/core.js.mem')
      this.response = data
      useRequest()
    },
    status: 200
  }
}
{{BODY}}
if (typeof module !== 'undefined')
  module.exports = Module
