var ENVIRONMENT_IS_WEB = true
var ENVIRONMENT_IS_NODE = false
var ENVIRONMENT_IS_SHELL = false

var Module = {
  'print': function () {},
  'printErr': function () {},
  'get_system_info': function () {
    var _data = Module._malloc(14)
    Module._retro_get_system_info(_data)
    var obj = {
      library_name: Module.Pointer_stringify(Module.getValue(_data, '*')),
      library_version: Module.Pointer_stringify(Module.getValue(_data + 4, '*')),
      valid_extensions: Module.Pointer_stringify(Module.getValue(_data + 8, '*')),
      need_fullpath: Module.getValue(_data + 12, 'i8') > 0,
      block_extract: Module.getValue(_data + 13, 'i8') > 0
    }
    Module._free(_data)
    return obj
  },
  'get_system_av_info': function () {
    var _data = Module._malloc(40)
    Module._retro_get_system_av_info(_data)
    var obj = {
      geometry: {
        base_width: Module.getValue(_data, 'i32'),
        base_height: Module.getValue(_data + 4, 'i32'),
        max_width: Module.getValue(_data + 8, 'i32'),
        max_height: Module.getValue(_data + 12, 'i32'),
        aspect_ratio: Module.getValue(_data + 16, 'float')
      },
      timing: {
        fps: Module.getValue(_data + 24, 'double'),
        sample_rate: Module.getValue(_data + 32, 'double')
      }
    }
    Module._free(_data)
    return obj
  },
  'serialize': function () {
    var size = Module.serialize_size()
    var _data = Module._malloc(size)
    var result = Module._retro_serialize(_data, size)
    var data = false
    if (result) {
      data = new Uint8Array(Module.HEAP8.buffer, _data, size)
    }
    return data
  },
  'unserialize': function (data) {
    var _data = Module._malloc(data.length)
    new Uint8Array(Module.HEAP8.buffer, _data, data.length).set(data)
    var result = Module._retro_unserialize(_data, data.length)
    return result
  },
  'cheat_set': function (index, enabled, code) {
    var _code = Module._malloc(code.length)
    Module.writeStringToMemory(code, _code)
    Module._retro_cheat_set(index, enabled, _code)
  },
  'load_game': function (info) {
    var _info = Module._malloc(16)
    if (info.path) {
      var path = Module._malloc(info.path.length + 1)
      Module.writeStringToMemory(info.path, path)
      Module.setValue(_info, path, '*')
    }
    if (info.meta) {
      var meta = Module._malloc(info.meta.length + 1)
      Module.writeStringToMemory(info.meta, meta)
      Module.setValue(_info + 12, meta, '*')
    }
    var _data = Module._malloc(info.data.length)
    new Uint8Array(Module.HEAP8.buffer, _data, info.data.length).set(info.data)
    Module.setValue(_info + 4, _data, '*')
    Module.setValue(_info + 8, info.data.length, 'i32')
    var result = Module._retro_load_game(_info)
    return result
  },
  'get_memory_data': function (id) {
    return new Uint8Array(Module.HEAP8.buffer, Module._retro_get_memory_data(id), Module.get_memory_size(id))
  }
}

{{BODY}}

// {{MODULE_ADDITIONS}}

module.exports = Module
