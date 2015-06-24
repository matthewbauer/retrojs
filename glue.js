/* global Module, mergeInto, LibraryManager, Runtime */
// callbacks defined in libretro.h
// scripts try to javascriptify them by getting rid of pointers
mergeInto(LibraryManager.library, { // TODO: use _free more
  video_refresh: function (_data, width, height, pitch) {
    var data = new Uint8Array(Module.HEAP8.buffer, _data, height * pitch)
    Module.video_refresh(data, width, height, pitch)
  },
  audio_sample_batch: function (_data, frames) {
    var left = new Float32Array(frames / 4)
    var right = new Float32Array(frames / 4)
    var data = new Int16Array(Module.HEAP8.buffer, _data, frames * 8)
    for (var i = 0; i < frames / 2; i++) {
      left[i] = data[i * 2] / 0x8000
      right[i] = data[i * 2 + 1] / 0x8000
    }
    return Module.audio_sample_batch(left, right, frames)
  },
  environment: function (cmd, _data) {
    switch (cmd) {
      case Module.ENVIRONMENT_SET_ROTATION:
        return Module.environment(cmd, Module.getValue(_data, 'i32'))
      case Module.ENVIRONMENT_GET_OVERSCAN:
        Module.setValue(_data, Module.environment(cmd), 'i32')
        return true
      case Module.ENVIRONMENT_GET_CAN_DUPE:
        Module.setValue(_data, Module.environment(cmd), 'i8')
        return true
      case Module.ENVIRONMENT_SHUTDOWN:
        return Module.environment(cmd)
      case Module.ENVIRONMENT_SET_PERFORMANCE_LEVEL:
        return Module.environment(cmd, Module.getValue(_data, 'i32'))
      case Module.ENVIRONMENT_GET_SYSTEM_DIRECTORY:
        var str = Module.environment(cmd)
        var buffer = Module._malloc(str.length + 1)
        Module.writeStringToMemory(str, buffer)
        Module.setValue(_data, buffer, '*')
        return true
      case Module.ENVIRONMENT_SET_PIXEL_FORMAT:
        return Module.environment(cmd, Module.getValue(_data, 'i32'))
      case Module.ENVIRONMENT_GET_VARIABLE_UPDATE:
        Module.setValue(_data, Module.environment(cmd), 'i8')
        return true
      case Module.ENVIRONMENT_SET_SUPPORT_NO_GAME:
        return Module.environment(cmd, Module.getValue(_data, 'i8'))
      case Module.ENVIRONMENT_GET_LIBPATH:
        var str = Module.environment(cmd)
        var buffer = Module._malloc(str.length + 1)
        Module.writeStringToMemory(str, buffer)
        Module.setValue(_data, buffer, '*')
        return true
      case Module.ENVIRONMENT_GET_INPUT_DEVICE_CAPABILITIES:
        Module.setValue(_data, Module.environment(cmd), 'i64')
        return true
      case Module.ENVIRONMENT_GET_LOG_INTERFACE:
        Module.setValue(_data, Runtime.addFunction(Module.environment(cmd)), '*')
        return true
      case Module.ENVIRONMENT_GET_CORE_ASSETS_DIRECTORY:
        var str = Module.environment(cmd)
        var buffer = Module._malloc(str.length + 1)
        Module.writeStringToMemory(str, buffer)
        Module.setValue(_data, buffer, '*')
        return true
      case Module.ENVIRONMENT_GET_SAVE_DIRECTORY:
        var str = Module.environment(cmd)
        var buffer = Module._malloc(str.length + 1)
        Module.writeStringToMemory(str, buffer)
        Module.setValue(_data, buffer, '*')
        return true
      case Module.ENVIRONMENT_SET_GEOMETRY:
        return Module.environment(cmd, {
          base_width: Module.getValue(_data, 'i32'),
          base_height: Module.getValue(_data + 4, 'i32'),
          max_width: Module.getValue(_data + 8, 'i32'),
          max_height: Module.getValue(_data + 12, 'i32'),
          aspect_ratio: Module.getValue(_data + 16, 'float')
        })
      case Module.ENVIRONMENT_GET_USERNAME:
        var str = Module.environment(cmd)
        var buffer = Module._malloc(str.length + 1)
        Module.writeStringToMemory(str, buffer)
        Module.setValue(_data, buffer, '*')
        return true
      case Module.ENVIRONMENT_GET_LANGUAGE:
        Module.setValue(_data, Module.environment(cmd), 'i32')
        return true
      default:
        return Module.environment(cmd, _data)
    }
  },
  audio_sample: function (left, right) {
    return Module.audio_sample(left, right)
  },
  input_poll: function () {
    Module.input_poll()
  },
  input_state: function (port, device, index, id) {
    return Module.input_state(port, device, index, id)
  }
})
