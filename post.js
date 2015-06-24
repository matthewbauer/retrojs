/* global Module */
// implementation for methods that embind can't handle
Module['get_system_info'] = function () {
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
}
Module['get_system_av_info'] = function () {
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
}
Module['serialize'] = function () {
  var size = Module.serialize_size()
  var _data = Module._malloc(size)
  var result = Module._retro_serialize(_data, size)
  var data = false
  if (result) {
    data = Module.HEAP8.slice(_data, size)
  }
  Module._free(_data)
  return data
}
Module['unserialize'] = function (data) {
  var _data = Module._malloc(data.length)
  var result = Module._retro_unserialize(_data, data.length)
  return result
}
Module['cheat_set'] = function (index, enabled, code) {
  var _code = Module._malloc(code.length)
  Module.writeStringToMemory(code, _code)
  Module._retro_cheat_set(index, enabled, _code)
}
Module['load_game'] = function (info) {
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
}
Module['get_memory_data'] = function (id) {
  return new Uint8Array(Module.HEAP8.buffer, Module._retro_get_memory_data(id), Module.get_memory_size(id))
}
// TODO:
// retro_load_game_special
