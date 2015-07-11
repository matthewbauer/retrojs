/* globals describe, it, before, after, beforeEach, afterEach */

import chai from 'chai'
const expect = chai.expect
import sinon from 'sinon'

System.config({
  paths: {
    'core:*': 'core/*/index.js',
    'rom:*': 'roms/*',
    'github:*': 'jspm_packages/github/*.js',
    'npm:*': 'jspm_packages/npm/*.js'
  },
  map: {
    'fs': 'github:jspm/nodelibs-fs@0.1.2'
  }
})

import data from './test.json!json'
let info = data.cores[0]

//cores.forEach(function (info) {
  describe(info.name, function () {
    let core
    var environment = sinon.spy(function (cmd, _data) {
      if (cmd === core.environment.get_log_interface) {
        return sinon.spy()
      }
    })
    var audio_sample = sinon.spy()
    var audio_sample_batch = sinon.spy(function (left, right, frames) {
      return frames
    })
    var input_state = sinon.spy(function () {
      return 0
    })
    var input_poll = sinon.spy()
    var video_refresh = sinon.spy()
    before(function (done) {
      System.import(`core:${info.name}`).then(function (_core) {
        core = _core
        core.set_environment(environment)
        core.set_audio_sample(audio_sample)
        core.set_audio_sample_batch(audio_sample_batch)
        core.set_input_state(input_state)
        core.set_input_poll(input_poll)
        core.set_video_refresh(video_refresh)
        core.init()
        done()
      }).catch(done)
    })
    after(function () {
      core.deinit()
    })
    describe('properties', function () {
      it('api_version()', function () {
        expect(core.api_version()).to.equal(1)
        expect(core.api_version()).to.equal(core.API_VERSION)
      })
      it('get_region()', function () {
        expect(core.get_region()).to.equal(core.region[info.region])
      })
      it('get_system_info()', function () {
        let info = core.get_system_info()
        expect(info.library_name).to.be.a('string')
        expect(info.library_version).to.be.a('string')
        expect(info.valid_extensions).to.be.a('string')
        expect(info.need_fullpath).to.be.a('boolean')
        expect(info.block_extract).to.be.a('boolean')
      })
      if (info.system_info) {
        it('get_system_info() matches core info', function () {
          expect(core.get_system_info()).deep.equal(info.system_info)
        })
      }
      it('get_system_av_info()', function () {
        let info = core.get_system_av_info()
        expect(info.geometry.base_width).to.be.a('number')
        expect(info.geometry.base_height).to.be.a('number')
        expect(info.geometry.max_width).to.be.a('number')
        expect(info.geometry.max_height).to.be.a('number')
        expect(info.geometry.aspect_ratio).to.be.a('number')
        expect(info.timing.fps).to.be.a('number')
        expect(info.timing.sample_rate).to.be.a('number')
      })
    })
    describe('controllers', function () {
      it('set_controller_port_device', function () {
        core.set_controller_port_device(0, core.DEVICE_JOYPAD)
      })
    })
    describe('cheats', function () {
      it('cheat_reset', function () {
        core.cheat_reset()
      })
    })
    info.roms.forEach(function (rom) {
      describe(rom.name, function (done) {
        beforeEach(function (done) {
          System.import(`rom:${rom.name}!raw`).then(function (data) {
            core.load_game({
              data: new Uint8Array(data)
            })
            done()
          }).catch(done)
        })
        afterEach(function () {
          core.unload_game()
        })
        it('running for 50 frames', function () {
          this.timeout(10000)
          for (let i = 0; i < 50; i++) {
            core.run()
          }
          expect(input_poll.alwaysCalledWith())
          expect(video_refresh.alwaysCalledWith(sinon.match.object, sinon.match.number, sinon.match.number, sinon.match.number))
          expect(input_state.alwaysCalledWith(sinon.match.number, sinon.match.number, sinon.match.number, sinon.match.number))
          expect(audio_sample_batch.alwaysCalledWith(sinon.match.object, sinon.match.object, sinon.match.number))
        })
        it('mashing buttons', function () {
          core.input_state = function () {
            return (Math.floor(Math.random() * 100) === 0) ? 1 : 0
          }
          core.audio_sample_batch = function () {}
          core.input_poll = function () {}
          core.video_refresh = function () {}
          for (let i = 0; i < 100; i++) {
            core.run()
          }
        })
        it('fps >= 60', function () {
          const frames = 100
          this.timeout(1000 * frames / 60)
          core.input_state = function () {}
          core.audio_sample_batch = function () {}
          core.input_poll = function () {}
          core.video_refresh = function () {}
          for (let i = 0; i < frames; i++) {
            core.run()
          }
        })
        it('saving...', function () {
          this.timeout(3000) // shouldn't take this long
          let save = new Uint8Array(core.serialize())
          core.reset()
          let notnewsave = new Uint8Array(core.serialize())
          expect(notnewsave).not.deep.equal(save)
          core.unserialize(save)
          let newsave = new Uint8Array(core.serialize())
          expect(newsave).deep.equal(save)
        })
      })
    })
  })
//})
