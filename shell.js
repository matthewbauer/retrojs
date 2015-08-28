'format amd'
if (typeof define !== 'function') {
  if (typeof require === 'function') {
    var define = require('amdefine')(module)
  }
}
define([], function () {
  var ENVIRONMENT_IS_WEB = true
  var ENVIRONMENT_IS_NODE = false
  var ENVIRONMENT_IS_SHELL = false
  var Module = {
    'print': function () {},
    'printErr': function () {},
    'noExitRuntime': true,
    'noInitialRun': true
  }
  {{BODY}}
  Module.Runtime = Runtime
  Module.FS = FS
  return Module
})
