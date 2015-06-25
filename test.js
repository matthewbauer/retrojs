/* global describe, it, beforeEach, afterEach */
var expect = require('chai').expect
var fs = require('fs')
var sinon = require('sinon')
var cores = fs.readdirSync('core').map(function (corename) {
  return './core/' + corename
})

describe('testing cores without initializing', function () {
  cores.forEach(function (corefile) {
    var core = require(corefile)
    describe(corefile, function () {
      describe('constants are defined', function () {
        it('API_VERSION === 1', function () {
          expect(core.API_VERSION).to.equal(1)
        })
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
  })
})
describe('loading cores', function () {
  describe('SNES9X NEXT info', function () {
    var core = require('./core/snes9x-next')
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
  })
  describe('loading games', function (done) {
    this.timeout(10000)
    var snes = null
    beforeEach(function () {
      snes = require('./core/snes9x-next')
      snes.environment = function (cmd, _data) {
        if (cmd === snes.ENVIRONMENT_GET_LOG_INTERFACE) {
          return function () { }
        } else {
          return true
        }
      }
      snes.init()
      snes.audio_sample = sinon.stub()
      snes.audio_sample_batch = sinon.stub()
      snes.input_state = sinon.stub()
      snes.input_poll = sinon.stub()
      snes.video_refresh = sinon.stub()
    })
    afterEach(function () {
      snes.unload_game()
      snes.deinit()
      delete require.cache[require.resolve('./core/snes9x-next')]
      snes = null
    })
    it('loading super mario world', function () {
      snes.load_game({
        data: new Uint8Array(fs.readFileSync('roms/Super Mario World.smc'))
      })
      for (var i = 0; i < 500; i++) {
        snes.run()
      }
      expect(snes.audio_sample.notCalled)
      expect(snes.input_poll.calledOnce)
      expect(snes.video_refresh.calledOnce)
      expect(snes.input_state.calledOnce)
      expect(snes.audio_sample_batch.calledOnce)
      expect(snes.serialize_size()).to.equal(433242)
    })
    it('loading nwarp', function () {
      snes.load_game({
        data: new Uint8Array(fs.readFileSync('roms/nwarp.smc'))
      })
      for (var i = 0; i < 50; i++) {
        snes.run()
      }
      expect(snes.audio_sample.notCalled)
      expect(snes.input_poll.calledOnce)
      expect(snes.video_refresh.calledOnce)
      expect(snes.input_state.calledOnce)
      expect(snes.audio_sample_batch.calledOnce)
      var save = new Uint8Array(snes.serialize())
      snes.reset()
      var notnewsave = new Uint8Array(snes.serialize())
      expect(notnewsave).not.deep.equal(save)
      snes.unserialize(save)
      var newsave = new Uint8Array(snes.serialize())
      expect(newsave).deep.equal(save)
    })
  })
})
