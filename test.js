var test = require('ava')
var fs = require('fs')
var denodeify = require('denodeify')
var cores = require('./test.json')

cores.forEach(function(core) {
  if (core.name !== 'snes9x-next')
    return
  test.cb.beforeEach(core.name + '.init()', function(t) {
    delete require.cache[require.resolve('./core/' + core.name)]
    t.context = require('./core/' + core.name)
    t.context.set_environment(function(cmd, _data) {
      if (cmd === t.context.ENVIRONMENT_GET_LOG_INTERFACE) {
        return function(data) {}
      } else if (cmd === t.context.ENVIRONMENT_GET_CAN_DUPE) {
        return true
      } else if (cmd === t.context.ENVIRONMENT_GET_OVERSCAN) {
        return true
      } else if (cmd === t.context.ENVIRONMENT_SET_PIXEL_FORMAT) {
        return true
      } else if (cmd === t.context.ENVIRONMENT_SET_PERFORMANCE_LEVEL) {
        return true
      } else if (cmd === t.context.ENVIRONMENT_SET_VARIABLES) {
        return true
      } else if (cmd === t.context.ENVIRONMENT_GET_VARIABLE_UPDATE) {
        return false
      } else if (cmd === t.context.ENVIRONMENT_GET_VARIABLE) {
        if (_data.key === 'mupen64-gfxplugin') {
          return 'angrylion'
        } else {
          return ''
        }
      } else if (cmd === t.context.ENVIRONMENT_GET_SYSTEM_DIRECTORY) {
        return '.'
      } else if (cmd === t.context.ENVIRONMENT_GET_PERF_INTERFACE) {
        return {
          get_time_usec: function() {
            return new Date().getTime() * 1000
          },
          get_cpu_features: function() {
            return 0
          },
          log: function() {},
          stop: function() {},
          start: function() {},
          perf_register: function() {}
        }
      } else if (cmd === t.context.ENVIRONMENT_GET_RUMBLE_INTERFACE) {
        return function () {
          return true
        }
      } else {
        return true
      }
    })
    t.context.set_audio_sample(function(){})
    t.context.set_audio_sample_batch(function(left, right, frames) { return frames })
    t.context.set_input_state(function() { return 0 })
    t.context.set_input_poll(function(){})
    t.context.set_video_refresh(function(){})
    t.context.init()
    t.end()
  })
  test.cb.afterEach(core.name + '.deinit()', function(t) {
    t.context.deinit()
    t.end()
  })
  test.cb(core.name + '.api_version()', function(t) {
    t.is(t.context.api_version(), 1)
    t.is(t.context.api_version(), t.context.API_VERSION)
    t.end()
  })
  test.cb(core.name + '.get_region()', function(t) {
    t.is(t.context.get_region(), t.context['REGION_' + core.region])
    t.end()
  })
  test.cb(core.name + '.get_system_info()', function(t) {
    var system_info = t.context.get_system_info()
    t.is(typeof system_info.library_name, 'string')
    t.is(typeof system_info.library_version, 'string')
    t.is(typeof system_info.valid_extensions, 'string')
    t.is(typeof system_info.need_fullpath, 'boolean')
    t.is(typeof system_info.block_extract, 'boolean')
    if (core.system_info) {
      t.same(system_info, core.system_info)
    } else {
      // cores[key].system_info = system_info
    }
    t.end()
  })
  test.cb(core.name + '.get_system_av_info()', function(t) {
    var av_info = t.context.get_system_av_info()
    t.is(typeof av_info.geometry.base_width,'number')
    t.is(typeof av_info.geometry.base_height, 'number')
    t.is(typeof av_info.geometry.max_width, 'number')
    t.is(typeof av_info.geometry.max_height, 'number')
    t.is(typeof av_info.geometry.aspect_ratio, 'number')
    t.is(typeof av_info.timing.fps, 'number')
    t.is(typeof av_info.timing.sample_rate, 'number')
    if (core.av_info) {
      t.same(av_info, core.av_info)
    } else {
      // cores[key].av_info = av_info
    }
    t.end()
  })
  test.cb(core.name + '.set_controller_port_device()', function(t) {
    t.context.set_controller_port_device(0, t.context.DEVICE_JOYPAD)
    t.end()
  })
  test.cb(core.name + '.cheat_reset()', function(t) {
    t.context.cheat_reset()
    t.end()
  })
  core.roms.forEach(function(rom) {
    test.beforeEach(core.name + '.load_game(' + rom.name + ')', function(t) {
      return denodeify(fs.readFile)('./fixtures/roms/' + rom.name)
      .then(function(buffer) {
        t.context.load_game(new Uint8Array(buffer))
      })
    })
    test.cb.afterEach(core.name + '.unload_game()', function(t) {
      t.context.unload_game()
      t.end()
    })
    test.cb(core.name + ' : ' + rom.name + ' : running for 100 frames', function(t) {
      for (var i = 0; i < 100; i++) {
        t.context.run()
      }
      t.end()
    })
    test.cb(core.name + ' : ' + rom.name + ' : resetting game', function(t) {
      for (var i = 0; i < 50; i++) {
        t.context.run()
      }
      t.context.reset()
      for (var i = 0; i < 50; i++) {
        t.context.run()
      }
      t.end()
    })
    test.cb(core.name + ': ' + rom.name + ' : mashing buttons', function(t) {
      t.context.set_input_state(function() {
        return 1
      })
      for (var i = 0; i < 100; i++) {
        t.context.run()
      }
      t.end()
    })
    if (rom.hasFirstFrame) {
      test(core.name + ': ' + rom.name + ' : checking first frame', function(t) {
        return denodeify(fs.readFile)('./fixtures/frames/0/' + rom.name + '.dat')
        .then(function(buffer) {
          t.context.set_video_refresh(function(frame) {
            t.same(buffer, new Uint8Array(frame))
          })
          t.context.run()
        })
      })
    } else {
      // test('generating first frame...', function(t) {
      //   core.set_video_refresh(function(frame) {
      //     denodeify(fs.writeFile)('./fixtures/frames/0/' + rom.name + '.dat', new Uint8Array(frame))
      //     cores[key].rom.hasFirstFrame = true
      //   })
      //   core.run()
      //   core.set_video_refresh(video_refresh)
      //   t.end()
      // })
    }
    if (!rom.skipSave) {
      test.cb(core.name + ': ' + rom.name + ' : saving', function(t) {
        var save = new Uint8Array(t.context.serialize())
        t.context.reset()
        var notnewsave = new Uint8Array(t.context.serialize())
        t.same(notnewsave, save)
        t.context.unserialize(save)
        var newsave = new Uint8Array(t.context.serialize())
        t.same(newsave, save)
        t.end()
      })
    }
  })
})
