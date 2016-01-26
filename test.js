var test = require('ava')
var fs = require('fs')
var denodeify = require('denodeify')
var cores = require('./test.json')

function environment(cmd, _data) {
  if (cmd === this.ENVIRONMENT_GET_LOG_INTERFACE) {
    return function(data) {}
  } else if (cmd === this.ENVIRONMENT_GET_CAN_DUPE) {
    return true
  } else if (cmd === this.ENVIRONMENT_GET_OVERSCAN) {
    return true
  } else if (cmd === this.ENVIRONMENT_SET_PIXEL_FORMAT) {
    return true
  } else if (cmd === this.ENVIRONMENT_SET_PERFORMANCE_LEVEL) {
    return true
  } else if (cmd === this.ENVIRONMENT_SET_VARIABLES) {
    return true
  } else if (cmd === this.ENVIRONMENT_GET_VARIABLE_UPDATE) {
    return false
  } else if (cmd === this.ENVIRONMENT_GET_VARIABLE) {
    if (_data.key === 'mupen64-gfxplugin') {
      return 'angrylion'
    } else {
      return ''
    }
  } else if (cmd === this.ENVIRONMENT_GET_SYSTEM_DIRECTORY) {
    return '.'
  } else if (cmd === this.ENVIRONMENT_GET_PERF_INTERFACE) {
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
  } else if (cmd === this.ENVIRONMENT_GET_RUMBLE_INTERFACE) {
    return function () {
      return true
    }
  } else {
    return true
  }
}

function loadCore(core) {
  var path = './core/' + core.name
  delete require.cache[require.resolve(path)]
  return require(path)
}

function testGame(test, core, rom) {
  test(core.name + ' : ' + rom.name + ' : running for 100 frames', function(t) {
    return denodeify(fs.readFile)('./fixtures/roms/' + rom.name)
    .then(function(buffer) {
      t.context = loadCore(core)
      t.context.set_environment(environment.bind(t.context))
      t.context.set_audio_sample(function(){})
      t.context.set_audio_sample_batch(function(left, right, frames) { return frames })
      t.context.set_input_state(function() { return 0 })
      t.context.set_input_poll(function(){})
      t.context.set_video_refresh(function(){})
      t.context.init()
      t.context.load_game(new Uint8Array(buffer))
      for (var i = 0; i < 100; i++) {
        t.context.run()
      }
    })
  })
  test(core.name + ' : ' + rom.name + ' : resetting game', function(t) {
    return denodeify(fs.readFile)('./fixtures/roms/' + rom.name)
    .then(function(buffer) {
      t.context = loadCore(core)
      t.context.set_environment(environment.bind(t.context))
      t.context.set_audio_sample(function(){})
      t.context.set_audio_sample_batch(function(left, right, frames) { return frames })
      t.context.set_input_state(function() { return 0 })
      t.context.set_input_poll(function(){})
      t.context.set_video_refresh(function(){})
      t.context.init()
      t.context.load_game(new Uint8Array(buffer))
      for (var i = 0; i < 50; i++) {
        t.context.run()
      }
      t.context.reset()
      for (var i = 0; i < 50; i++) {
        t.context.run()
      }
    })
  })
  test(core.name + ': ' + rom.name + ' : mashing buttons', function(t) {
    return denodeify(fs.readFile)('./fixtures/roms/' + rom.name)
    .then(function(buffer) {
      t.context = loadCore(core)
      t.context.set_environment(environment.bind(t.context))
      t.context.set_audio_sample(function(){})
      t.context.set_audio_sample_batch(function(left, right, frames) { return frames })
      t.context.set_input_state(function() {
        return 1
      })
      t.context.set_input_poll(function(){})
      t.context.set_video_refresh(function(){})
      t.context.init()
      t.context.load_game(new Uint8Array(buffer))
      for (var i = 0; i < 100; i++) {
        t.context.run()
      }
    })
  })
  if (rom.hasFirstFrame) {
    test(core.name + ': ' + rom.name + ' : checking first frame', function(t) {
      return denodeify(fs.readFile)('./fixtures/roms/' + rom.name)
      .then(function(buffer) {
        return denodeify(fs.readFile)('./fixtures/frames/0/' + rom.name + '.dat')
        .then(function(b) {
          t.context = loadCore(core)
          t.context.set_environment(environment.bind(t.context))
          t.context.set_audio_sample(function(){})
          t.context.set_audio_sample_batch(function(left, right, frames) { return frames })
          t.context.set_input_state(function() { return 0 })
          t.context.set_input_poll(function(){})
          t.context.set_video_refresh(function(frame) {
            t.same(b, frame)
          })
          t.context.init()
          t.context.load_game(new Uint8Array(buffer))
          t.context.run()
        })
      })
    })
  } else {
    test('generating first frame...', function(t) {
      return denodeify(fs.readFile)('./fixtures/roms/' + rom.name)
      .then(function(buffer) {
        t.context = loadCore(core)
        t.context.set_environment(environment.bind(t.context))
        t.context.set_audio_sample(function(){})
        t.context.set_audio_sample_batch(function(left, right, frames) { return frames })
        t.context.set_input_state(function() { return 0 })
        t.context.set_input_poll(function(){})
        t.context.set_video_refresh(function(frame) {
          fs.writeFileSync('./fixtures/frames/0/' + rom.name + '.dat', new Buffer(frame), 'binary')
          rom.hasFirstFrame = true
        })
        t.context.init()
        t.context.load_game(new Uint8Array(buffer))
        t.context.run()
      })
    })
  }
  if (!rom.skipSave) {
    test(core.name + ': ' + rom.name + ' : saving', function(t) {
      return denodeify(fs.readFile)('./fixtures/roms/' + rom.name)
      .then(function(buffer) {
        t.context = loadCore(core)
        t.context.set_environment(environment.bind(t.context))
        t.context.set_audio_sample(function(){})
        t.context.set_audio_sample_batch(function(left, right, frames) { return frames })
        t.context.set_input_state(function() { return 0 })
        t.context.set_input_poll(function(){})
        t.context.set_video_refresh(function(){})
        t.context.init()
        t.context.load_game(new Uint8Array(buffer))
        var save = new Uint8Array(t.context.serialize())
        t.context.reset()
        var notnewsave = new Uint8Array(t.context.serialize())
        t.same(notnewsave, save)
        t.context.unserialize(save)
        var newsave = new Uint8Array(t.context.serialize())
        t.same(newsave, save)
      })
    })
  }
}

function testCore(test, core) {
  test.cb(core.name + '.api_version()', function(t) {
    t.context = loadCore(core)
    t.is(t.context.api_version(), 1)
    t.is(t.context.api_version(), t.context.API_VERSION)
    t.end()
  })
  test.cb(core.name + '.get_region()', function(t) {
    t.context = loadCore(core)
    t.is(t.context.get_region(), t.context['REGION_' + core.region])
    t.end()
  })
  test.cb(core.name + '.get_system_info()', function(t) {
    t.context = loadCore(core)
    var system_info = t.context.get_system_info()
    t.is(typeof system_info.library_name, 'string')
    t.is(typeof system_info.library_version, 'string')
    t.is(typeof system_info.valid_extensions, 'string')
    t.is(typeof system_info.need_fullpath, 'boolean')
    t.is(typeof system_info.block_extract, 'boolean')
    if (core.system_info) {
      t.same(system_info, core.system_info)
    } else {
      core.system_info = system_info
    }
    t.end()
  })
  test.cb(core.name + '.get_system_av_info()', function(t) {
    t.context = loadCore(core)
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
      core.av_info = av_info
    }
    t.end()
  })
  test.cb(core.name + '.set_controller_port_device()', function(t) {
    t.context = loadCore(core)
    t.context.set_controller_port_device(0, t.context.DEVICE_JOYPAD)
    t.end()
  })
  test.cb(core.name + '.cheat_reset()', function(t) {
    t.context = loadCore(core)
    t.context.cheat_reset()
    t.end()
  })
  core.roms.forEach(function(rom) {
    // testGame(test, core, rom)
  })
}

cores.forEach(function(core) {
  testCore(test, core)
})

test.after(function(t) {
  return denodeify(fs.writeFile)('./test.json', JSON.stringify(cores, undefined, 2))
})
