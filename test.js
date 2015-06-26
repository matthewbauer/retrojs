/* global describe, it, beforeEach, afterEach, after, before */
var expect = require('chai').expect
var fs = require('fs')
var sinon = require('sinon')
var cores = fs.readdirSync('core').filter(function (corename) {
  return corename[0] !== '.'
})

process.setMaxListeners(0)

describe('testing cores', function () {
  cores.forEach(function (corename) {
    var corefile = './core/' + corename
    describe(corefile + ' properties', function () {
      var core = require(corefile)
      after(function () {
        core.deinit()
        delete require.cache[require.resolve(corefile)]
        core = null
      })
      it('API_VERSION === 1', function () {
        expect(core.API_VERSION).to.equal(1)
      })
      it('api_version()', function () {
        expect(core.api_version()).to.equal(1)
        expect(core.api_version()).to.equal(core.API_VERSION)
      })
      it('get_region()', function () {
        expect(core.get_region()).to.equal(core.REGION_NTSC)
      })
      describe('get_system_info()', function () {
        var info = core.get_system_info()
        it('library_name', function () {
          expect(info.library_name).to.be.a('string')
        })
        it('library_version', function () {
          expect(info.library_version).to.be.a('string')
        })
        it('valid_extensions', function () {
          expect(info.valid_extensions).to.be.a('string')
        })
        it('need_fullpath', function () {
          expect(info.need_fullpath).to.be.a('boolean')
        })
        it('block_extract', function () {
          expect(info.block_extract).to.be.a('boolean')
        })
      })
      describe('get_system_av_info()', function () {
        var info = core.get_system_av_info()
        it('game_geometry', function () {
          expect(info.geometry.base_width).to.be.a('number')
          expect(info.geometry.base_height).to.be.a('number')
          expect(info.geometry.max_width).to.be.a('number')
          expect(info.geometry.max_height).to.be.a('number')
          expect(info.geometry.aspect_ratio).to.be.a('number')
        })
        it('system_timing', function () {
          expect(info.timing.fps).to.be.a('number')
          expect(info.timing.sample_rate).to.be.a('number')
        })
      })
    })
    describe('initing ' + corefile, function () {
      var core = null
      var log = sinon.spy()
      beforeEach(function () {
        core = require(corefile)
        core.environment = sinon.spy(function (cmd, _data) {
          if (cmd === core.ENVIRONMENT_GET_LOG_INTERFACE) {
            return log
          } else {
            return true
          }
        })
        core.init()
        core.audio_sample = sinon.spy()
        core.audio_sample_batch = sinon.spy()
        core.input_state = sinon.spy()
        core.input_poll = sinon.spy()
        core.video_refresh = sinon.spy()
      })
      it('set_controller_port_device', function () {
        core.set_controller_port_device(0, core.DEVICE_JOYPAD)
      })
      it('get_memory_size', function () {
        expect(core.get_memory_size(core.MEMORY_SAVE_RAM)).to.be.a('number')
        expect(core.get_memory_size(core.MEMORY_RTC)).to.be.a('number')
        expect(core.get_memory_size(core.MEMORY_SYSTEM_RAM)).to.be.a('number')
        expect(core.get_memory_size(core.MEMORY_VIDEO_RAM)).to.be.a('number')
      })
      it('cheat_reset', function () {
        core.cheat_reset()
      })
      afterEach(function () {
        core.deinit()
        delete require.cache[require.resolve(corefile)]
        core = null
      })
    })
    if (!fs.existsSync('./roms/' + corename)) {
      return
    }
    var roms = fs.readdirSync('./roms/' + corename).filter(function (romname) {
      return romname[0] !== '.'
    })
    roms.forEach(function (romname) {
      describe('loading ' + romname, function (done) {
        this.timeout(10000)
        var core = null
        before(function () {
          core = require(corefile)
          core.environment = function (cmd, _data) {
            if (cmd === core.ENVIRONMENT_GET_LOG_INTERFACE) {
              return function () { }
            } else {
              return true
            }
          }
          core.init()
          core.audio_sample = sinon.spy()
          core.audio_sample_batch = sinon.spy()
          core.input_state = sinon.spy()
          core.input_poll = sinon.spy()
          core.video_refresh = sinon.spy()
          core.load_game({
            data: new Uint8Array(fs.readFileSync('roms/' + corename + '/' + romname))
          })
        })
        after(function () {
          core.unload_game()
          core.deinit()
          delete require.cache[require.resolve(corefile)]
          core = null
        })
        it('running for 50 frames...', function () {
          for (var i = 0; i < 50; i++) {
            core.run()
          }
          expect(core.audio_sample.notCalled)
          expect(core.input_poll.called)
          expect(core.input_poll.alwaysCalledWith())
          expect(core.video_refresh.called)
          expect(core.video_refresh.alwaysCalledWith(sinon.match.object, sinon.match.number, sinon.match.number, sinon.match.number))
          expect(core.input_state.called)
          expect(core.input_state.alwaysCalledWith(sinon.match.number, sinon.match.number, sinon.match.number, sinon.match.number))
          expect(core.audio_sample_batch.called)
          expect(core.audio_sample_batch.alwaysCalledWith(sinon.match.object, sinon.match.object, sinon.match.number))
        })
        it('mashing buttons', function () {
          core.input_state = function () {
            return (Math.floor(Math.random() * 100) === 0) ? 1 : 0
          }
          core.audio_sample_batch = function () {}
          core.input_poll = function () {}
          core.video_refresh = function () {}
          for (var i = 0; i < 1000; i++) {
            core.run()
          }
        })
        it('fps >= 60', function () {
          var frames = 100
          this.timeout(1000 * frames / 60)
          core.input_state = function () {}
          core.audio_sample_batch = function () {}
          core.input_poll = function () {}
          core.video_refresh = function () {}
          for (var i = 0; i < frames; i++) {
            core.run()
          }
        })
        it('saving...', function () {
          var save = new Uint8Array(core.serialize())
          core.reset()
          var notnewsave = new Uint8Array(core.serialize())
          expect(notnewsave).not.deep.equal(save)
          core.unserialize(save)
          var newsave = new Uint8Array(core.serialize())
          expect(newsave).deep.equal(save)
        })
      })
    })
  })
})
describe('loading cores', function () {
  describe('SNES9X NEXT info', function () {
    var corefile = './core/snes9x-next'
    var core = require(corefile)
    it('system_info', function () {
      var info = core.get_system_info()
      expect(info.library_name).to.equal('Snes9X Next')
      expect(info.library_version).to.equal('v1.52.4')
      expect(info.valid_extensions).to.equal('smc|fig|sfc|gd3|gd7|dx2|bsx|swc')
      expect(info.need_fullpath).to.equal(false)
      expect(info.block_extract).to.equal(false)
    })
    var info = core.get_system_av_info()
    it('game_geometry', function () {
      expect(info.geometry.base_width).to.equal(256)
      expect(info.geometry.base_height).to.equal(224)
      expect(info.geometry.max_width).to.equal(512)
      expect(info.geometry.max_height).to.equal(512)
      expect(info.geometry.aspect_ratio).to.be.below(1.4)
      expect(info.geometry.aspect_ratio).to.be.above(1.3)
    })
    it('system_timing', function () {
      expect(info.timing.fps).to.be.above(60)
      expect(info.timing.fps).to.be.below(61)
      expect(info.timing.sample_rate).to.equal(32040.5)
    })
    describe('loading specific games', function () {
      before(function () {
        core.environment = function (cmd, _data) {
          if (cmd === core.ENVIRONMENT_GET_LOG_INTERFACE) {
            return function () { }
          } else {
            return true
          }
        }
        core.init()
        core.audio_sample = sinon.spy()
        core.audio_sample_batch = sinon.spy()
        core.input_state = sinon.spy()
        core.input_poll = sinon.spy()
        core.video_refresh = sinon.spy()
      })
      after(function () {
        core.unload_game()
        core.deinit()
        delete require.cache[require.resolve(corefile)]
        core = null
      })
      it('running super mario world', function () {
        core.load_game({
          data: new Uint8Array(fs.readFileSync('roms/snes9x-next/Super Mario World.smc'))
        })
        for (var i = 0; i < 50; i++) {
          core.run()
        }
        expect(core.serialize_size()).to.equal(433242)
        expect(core.get_memory_size(core.MEMORY_SAVE_RAM)).to.equal(2048)
        expect(core.get_memory_size(core.MEMORY_RTC)).to.equal(0)
        expect(core.get_memory_size(core.MEMORY_SYSTEM_RAM)).to.equal(131072)
        expect(core.get_memory_size(core.MEMORY_VIDEO_RAM)).to.equal(65536)
      })
      it('load cheats onto smw', function () {
        core.load_game({
          data: new Uint8Array(fs.readFileSync('roms/snes9x-next/Super Mario World.smc'))
        })
        for (var i = 0; i < 5; i++) {
          core.run()
        }
        core.cheat_set(0, true, '3E2C-AF6F')
      })
    })
  })
})
