'format amd'
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
  return Module
})
