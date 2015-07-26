"format global";
var ENVIRONMENT_IS_WEB = true;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
var Module = {
  'noInitialRun': true,
  'noExitRuntime': true,
  'print': function () {},
  'printErr': function () {}
};
{{BODY}}
