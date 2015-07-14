/* global Runtime */

// TODO: should avoid hardcoding type sizes
// TODO: should figure out a good way to organize constants
//  (grouping as objects might make things more complicated)

"amd"
define([], function () {
  var ENVIRONMENT_IS_WEB = true
  var ENVIRONMENT_IS_NODE = false
  var ENVIRONMENT_IS_SHELL = false

  var Module = {
    'noInitialRun': true,
    'print': function () {},
    'printErr': function () {},
    '_ptrs': [],
    'API_VERSION': 1,
    'camera_buffer': {
      'opengl_texture': 0,
      'raw_framebuffer': 1
    },
    'device': {
      'analog': 5,
      'joypad': 1,
      'keyboard': 3,
      'lightgun': 4,
      'mouse': 2,
      'none': 0,
      'pointer': 6,
      'type_shift': 8,
      'index': {
        'analog': {
          'left': 0,
          'right': 1
        }
      },
      'id': {
        'analog': {
           'x': 0,
           'y': 1
        },
        'joypad': {
           'a': 8,
           'b': 0,
           'down': 5,
           'l': 10,
           'l2': 12,
           'l3': 14,
           'left': 6,
           'r': 11,
           'r2': 13,
           'r3': 15,
           'right': 7,
           'select': 2,
           'start': 3,
           'up': 4,
           'x': 9,
           'y': 1
        },
        'lightgun': {
          'cursor': 3,
          'pause': 5,
          'start': 6,
          'trigger': 2,
          'turbo': 4,
          'x': 0,
          'y': 1
        },
        'mouse': {
          'horiz_wheeldown': 8,
          'horiz_wheelup': 7,
          'left': 2,
          'middle': 6,
          'right': 3,
          'wheeldown': 5,
          'wheelup': 4,
          'x': 0,
          'y': 1
        },
        'pointer': {
          'pressed': 2,
          'x': 0,
          'y': 1
        }
      }
    },
    'environment': {
      'get_can_dupe': 3,
      'get_core_assets_directory': 30,
      'get_input_device_capabilities': 24,
      'get_language': 39,
      'get_libpath': 19,
      'get_location_interface': 29,
      'get_log_interface': 27,
      'get_overscan': 2,
      'get_perf_interface': 28,
      'get_rumble_interface': 23,
      'get_save_directory': 31,
      'get_system_directory': 9,
      'get_username': 38,
      'get_variable_update': 17,
      'get_variable': 15,
      'set_audio_callback': 22,
      'set_controller_info': 35,
      'set_disk_control_interface': 13,
      'set_frame_time_callback': 21,
      'set_geometry': 37,
      'set_hw_render': 14,
      'set_input_descriptors': 11,
      'set_keyboard_callback': 12,
      'set_message': 6,
      'set_performance_level': 8,
      'set_pixel_format': 10,
      'set_proc_address_callback': 33,
      'set_rotation': 1,
      'set_subsystem_info': 34,
      'set_support_no_game': 18,
      'set_system_av_info': 32,
      'set_variables': 16,
      'shutdown': 7
    },
    'hw_context': {
      'none': 0,
      'opengl_core': 3,
      'opengl': 1,
      'opengles_version': 5,
      'opengles2': 2,
      'opengles3': 4
    },
    'language': {
      'chinese_simplified': 11,
      'chinese_traditional': 10,
      'dutch': 6,
      'english': 0,
      'french': 2,
      'german': 4,
      'italian': 5,
      'japanese': 1,
      'korean': 9,
      'portuguese': 7,
      'russian': 8,
      'spanish': 3
    },
    'log': {
      'debug': 0,
      'info': 1,
      'warn': 2,
      'error': 3
    },
    'memory': {
      'mask': 0xff,
      'rtc': 1,
      'save_ram': 0,
      'system_ram': 2,
      'video_ram': 3
    },
    'pixel_format': {
      '0rgb1555': 0,
      'rgb565': 2,
      'xrgb8888': 1
    },
    'region': {
      'ntsc': 0,
      'pal': 1
    },
    'rumble': {
      'strong': 0,
      'weak': 1
    },
    'sensor': {
      'accelerometer': {
        'enable': 0,
        'disable': 1,
        'x': 0,
        'y': 1,
        'z': 2
      }
    },
    'key': {
      '0': 48,
      '1': 49,
      '2': 50,
      '3': 51,
      '4': 52,
      '5': 53,
      '6': 54,
      '7': 55,
      '8': 56,
      '9': 57,
      'a': 97,
      'ampersand': 38,
      'asterisk': 42,
      'at': 64,
      'b': 98,
      'backquote': 96,
      'backslash': 92,
      'backspace': 8,
      'break': 318,
      'c': 99,
      'capslock': 301,
      'caret': 94,
      'clear': 12,
      'colon': 58,
      'comma': 44,
      'compose': 314,
      'd': 100,
      'delete': 127,
      'dollar': 36,
      'down': 274,
      'e': 101,
      'end': 279,
      'equals': 61,
      'escape': 27,
      'euro': 321,
      'exclaim': 33,
      'f': 102,
      'f1': 282,
      'f10': 291,
      'f11': 292,
      'f12': 293,
      'f13': 294,
      'f14': 295,
      'f15': 296,
      'f2': 283,
      'f3': 284,
      'f4': 285,
      'f5': 286,
      'f6': 287,
      'f7': 288,
      'f8': 289,
      'f9': 290,
      'first': 0,
      'g': 103,
      'greater': 62,
      'h': 104,
      'hash': 35,
      'help': 315,
      'home': 278,
      'i': 105,
      'insert': 277,
      'j': 106,
      'k': 107,
      'kp_divide': 267,
      'kp_enter': 271,
      'kp_equals': 272,
      'kp_minus': 269,
      'kp_multiply': 268,
      'kp_period': 266,
      'kp_plus': 270,
      'kp0': 256,
      'kp1': 257,
      'kp2': 258,
      'kp3': 259,
      'kp4': 260,
      'kp5': 261,
      'kp6': 262,
      'kp7': 263,
      'kp8': 264,
      'kp9': 265,
      'l': 108,
      'lalt': 308,
      'lctrl': 306,
      'left': 276,
      'leftbracket': 91,
      'leftparen': 40,
      'less': 60,
      'lmeta': 310,
      'lshift': 304,
      'lsuper': 311,
      'm': 109,
      'menu': 319,
      'minus': 45,
      'mode': 313,
      'n': 110,
      'numlock': 300,
      'o': 111,
      'p': 112,
      'pagedown': 281,
      'pageup': 280,
      'pause': 19,
      'period': 46,
      'plus': 43,
      'power': 320,
      'print': 316,
      'q': 113,
      'question': 63,
      'quote': 39,
      'quotedbl': 34,
      'r': 114,
      'ralt': 307,
      'rctrl': 305,
      'return': 13,
      'right': 275,
      'rightbracket': 93,
      'rightparen': 41,
      'rmeta': 309,
      'rshift': 303,
      'rsuper': 312,
      's': 115,
      'scrollock': 302,
      'semicolon': 59,
      'slash': 47,
      'space': 32,
      'sysreq': 317,
      't': 116,
      'tab': 9,
      'u': 117,
      'underscore': 95,
      'undo': 322,
      'unknown': 0,
      'up': 273,
      'v': 118,
      'w': 119,
      'x': 120,
      'y': 121,
      'z': 122
    },
    '_unstringify': function (ptr, str) {
      var _str = this._malloc(str.length + 1)
      this._ptrs.push(_str)
      this.writeStringToMemory(str, _str)
      this.setValue(ptr, _str, '*')
      return ptr
    },
    '_stringify': function (ptr) {
      return this.Pointer_stringify(this.getValue(ptr, '*'))
    },
    '_get_variable': function (ptr) {
      return {
        key: this._stringify(ptr),
        value: this._stringify(ptr + 4)
      }
    },
    '_get_av_info': function (_data) {
      return {
        geometry: {
          base_width: this.getValue(_data, 'i32'),
          base_height: this.getValue(_data + 4, 'i32'),
          max_width: this.getValue(_data + 8, 'i32'),
          max_height: this.getValue(_data + 12, 'i32'),
          aspect_ratio: this.getValue(_data + 16, 'float')
        },
        timing: {
          fps: this.getValue(_data + 24, 'double'),
          sample_rate: this.getValue(_data + 32, 'double')
        }
      }
    },
    '_set_info': function (_info, info) {
      if (info.path) {
        this._unstringify(_info, info.path)
      }
      if (info.meta) {
        this._unstringify(_info + 12, info.meta)
      }
      var _data = this._malloc(info.data.length)
      this._ptrs.push(_data)
      new Uint8Array(this.HEAP8.buffer, _data, info.data.length).set(info.data)
      this.setValue(_info + 4, _data, '*')
      this.setValue(_info + 8, info.data.length, 'i32')
      return _info
    },
    'get_system_info': function () {
      var _data = this._malloc(14)
      this._retro_get_system_info(_data)
      var obj = {
        library_name: this._stringify(_data),
        library_version: this._stringify(_data + 4),
        valid_extensions: this._stringify(_data + 8),
        need_fullpath: this.getValue(_data + 12, 'i8') > 0,
        block_extract: this.getValue(_data + 13, 'i8') > 0
      }
      this._free(_data)
      return obj
    },
    'get_system_av_info': function () {
      var _data = this._malloc(40)
      this._retro_get_system_av_info(_data)
      var info = this._get_av_info(_data)
      this._free(_data)
      return info
    },
    'serialize': function () {
      var size = this._retro_serialize_size()
      var _data = this._malloc(size)
      var data = false
      if (this._retro_serialize(_data, size)) {
        data = new Uint8Array(this.HEAP8.buffer, _data, size)
      }
      // this._free(_data)
      return data
    },
    'unserialize': function (data) {
      var _data = this._malloc(data.length)
      new Uint8Array(this.HEAP8.buffer, _data, data.length).set(data)
      var result = this._retro_unserialize(_data, data.length)
      // this._free(_data)
      return result
    },
    'cheat_set': function (index, enabled, code) {
      var _code = this._malloc(code.length)
      this._ptrs.push(_code)
      this.writeStringToMemory(code, _code)
      this._retro_cheat_set(index, enabled, _code)
    },
    'load_game': function (data) {
      var _info = this._malloc(16)
      this._ptrs.push(_info)
      this._set_info(_info, {data: data})
      return this._retro_load_game(_info)
    },
    'load_game_special': function (game_type, infos) {
      var _info = this._malloc(16 * infos.length)
      this._ptrs.push(_info)
      for (var info in infos) {
        this._set_info(_info + 16 * info, infos[info])
      }
      return this._retro_load_game_special(game_type, _info, infos.length)
    },
    'get_memory_data': function (id) {
      return new Uint8Array(this.HEAP8.buffer, this._retro_get_memory_data(id), this._retro_get_memory_size(id))
    },
    'set_environment': function (fn) { // complete libretro spec
      this._retro_set_environment(Runtime.addFunction(function (fn, cmd, _data) {
        switch (cmd) {
          case this.environment.shutdown: {
            return fn(cmd)
          }
          case this.environment.set_performance_level:
          case this.environment.set_pixel_format:
          case this.environment.set_rotation:
          case this.environment.set_support_no_game: {
            return fn(cmd, this.getValue(_data, 'i32'))
          }
          case this.environment.set_geometry: {
            return fn(cmd, {
              base_width: this.getValue(_data, 'i32'),
              base_height: this.getValue(_data + 4, 'i32'),
              max_width: this.getValue(_data + 8, 'i32'),
              max_height: this.getValue(_data + 12, 'i32'),
              aspect_ratio: this.getValue(_data + 16, 'float')
            })
          }
          case this.environment.set_input_descriptors: {
            var descriptions = []
            for (var ptr = _data; this.getValue(ptr + 16, '*'); ptr += 20) {
              descriptions.push({
                port: this.getValue(ptr, 'i32'),
                device: this.getValue(ptr + 4, 'i32'),
                index: this.getValue(ptr + 8, 'i32'),
                id: this.getValue(ptr + 12, 'i32'),
                description: this._stringify(ptr + 16)
              })
            }
            return fn(cmd, descriptions)
          }
          case this.environment.set_message: {
            return fn(cmd, this._stringify(_data), this.getValue(_data + 4, 'i32'))
          }
          case this.environment.set_system_av_info: {
            return fn(cmd, this._get_av_info(_data))
          }
          case this.environment.set_variables: {
            var variables = []
            for (ptr = _data; this.getValue(ptr, '*'); ptr += 8) {
              variables.push(this._get_variable(ptr))
            }
            return fn(cmd, variables)
          }
          case this.environment.set_audio_callback: {
            var audio = fn(cmd)
            this.setValue(_data, Runtime.addFunction(audio.callback))
            this.setValue(_data + 4, Runtime.addFunction(audio.set_state))
            return true
          }
          case this.environment.set_controller_info: {
            // var controllers = []
            // for (var ptr = _data; this.getValue(ptr, '*') != null; ptr += 8) {
            //   var _controller = this.getValue(ptr, '*')
            //   var controller = {}
            //   var num_types = this.getValue(ptr + 4, 'i32')
            //   for (var type = 0; type < num_types; type += 1) {
            //   }
            //   controllers.push(controller)
            // }
            return true
          }
          case this.environment.get_overscan:
          case this.environment.get_language:
          case this.environment.get_can_dupe:
          case this.environment.get_input_device_capabilities:
          case this.environment.get_variable_update: {
            this.setValue(_data, fn(cmd), 'i32')
            return true
          }
          case this.environment.get_system_directory:
          case this.environment.get_libpath:
          case this.environment.get_core_assets_directory:
          case this.environment.get_save_directory:
          case this.environment.get_username: {
            this._unstringify(_data, fn(cmd))
            return true
          }
          case this.environment.get_variable: {
            this._unstringify(fn(cmd, this._get_variable(_data)), _data + 4)
            return true
          }
          case this.environment.get_log_interface: {
            var func = fn(cmd)
            this.setValue(_data, Runtime.addFunction(function (func, level) {
              var args = []
              var varargs = Array.prototype.slice.call(arguments, 3)
              for (var vararg in varargs) {
                args.push(this.Pointer_stringify(varargs[vararg]))
              }
              fn.apply(null, [cmd, level].concat(args))
            }.bind(this, func)))
            return true
          }
          case this.environment.get_location_interface: {
            var location = fn(cmd)
            func.setValue(_data, Runtime.addFunction(location.start))
            this.setValue(_data + 4, Runtime.addFunction(location.stop))
            this.setValue(_data + 8, Runtime.addFunction(function (location, lat, lon, horiz_accuracy, vert_accuracy) {
              var position = location.get_position()
              this.setValue(lat, position.lat, 'double')
              this.setValue(lon, position.lon, 'double')
              this.setValue(horiz_accuracy, position.horiz_accuracy, 'double')
              this.setValue(vert_accuracy, position.vert_accuracy, 'double')
            }.bind(this, location)))
            this.setValue(_data + 12, Runtime.addFunction(location.set_interval))
            this.setValue(_data + 16, Runtime.addFunction(location.initialized))
            this.setValue(_data + 20, Runtime.addFunction(location.deinitialized))
            return true
          }
          case this.environment.get_rumble_interface: {
            this.setValue(_data, Runtime.addFunction(fn(cmd)))
            return true
          }
          default: {
            return fn(cmd, _data)
          }
        }
      }.bind(this, fn)))
    },
    'set_video_refresh': function (fn) {
      this._retro_set_video_refresh(Runtime.addFunction(function (fn, _data, width, height, pitch) {
        var data = new Uint8Array(this.HEAP8.buffer, _data, height * pitch)
        fn(data, width, height, pitch)
        this._free(_data)
      }.bind(this, fn)))
    },
    'set_audio_sample_batch': function (fn) {
      this._retro_set_audio_sample_batch(Runtime.addFunction(function (fn, _data, frames) {
        var left = new Float32Array(frames)
        var right = new Float32Array(frames)
        var data = new Int16Array(this.HEAP8.buffer, _data, frames * 4)
        for (var i = 0; i < frames; i++) {
          left[i] = data[i * 2] / 0x8000
          right[i] = data[i * 2 + 1] / 0x8000
        }
        this._free(_data)
        return fn(left, right, frames)
      }.bind(this, fn)))
    },
    'set_audio_sample': function (fn) {
      this._retro_set_audio_sample(Runtime.addFunction(fn))
    },
    'set_input_poll': function (fn) {
      this._retro_set_input_poll(Runtime.addFunction(fn))
    },
    'set_input_state': function (fn) {
      this._retro_set_input_state(Runtime.addFunction(fn))
    },
    'init': function () {
      this._retro_init()
    },
    'deinit': function () {
      this._retro_deinit()
    },
    'api_version': function () {
      return this._retro_api_version()
    },
    'reset': function () {
      this._retro_reset()
    },
    'run': function () {
      this._retro_run()
    },
    'unload_game': function () {
      this._retro_unload_game()
      for (var ptr in this._ptrs) {
        this._free(this._ptrs[ptr])
      }
      this._ptrs = []
    },
    'get_region': function () {
      return this._retro_get_region()
    },
    'cheat_reset': function () {
      this._retro_cheat_reset()
    },
    'set_controller_port_device': function (port, device) {
      this._retro_set_controller_port_device(port, device)
    }
  }

  {{BODY}}

  return Module
})
