'format amd';
define(['./retro'], function (retro) {
  var ENVIRONMENT_IS_WEB = true;
  var ENVIRONMENT_IS_NODE = false;
  var ENVIRONMENT_IS_SHELL = false;
  var Module = {
    'print': function () {},
    'printErr': function () {}
  };
  {{BODY}};
  Module.Runtime = Runtime;
  retro.default.call(Module);
  return Module;
});
