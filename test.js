/* globals describe, it, before, beforeEach, afterEach */

import chai from 'chai'
let expect = chai.expect
import sinon from 'sinon'
import data from './test.json'

if (typeof System === 'undefined') {
  System = require('systemjs')
  before(function (done) {
    System.import('./config.js').then(function () {
      done()
    }).catch(done)
  })
}

data.cores.forEach(function (info) {
  describe(info.name, function () {
    this.timeout(10000)
    let core
    var environment = function (cmd, _data) {
      if (cmd === core.ENVIRONMENT_GET_LOG_INTERFACE) {
        return sinon.spy(function (data) {})
      } else if (cmd === core.ENVIRONMENT_GET_CAN_DUPE) {
        return true
      } else if (cmd === core.ENVIRONMENT_GET_OVERSCAN) {
        return true
      } else if (cmd === core.ENVIRONMENT_SET_PIXEL_FORMAT) {
        return true
      } else if (cmd === core.ENVIRONMENT_SET_PERFORMANCE_LEVEL) {
        return true
      } else if (cmd === core.ENVIRONMENT_SET_VARIABLES) {
        return true
      } else if (cmd === core.ENVIRONMENT_GET_VARIABLE_UPDATE) {
        return false
      } else if (cmd === core.ENVIRONMENT_GET_PERF_INTERFACE) {
        return {
          get_time_usec: function () {
            return new Date().getTime() * 1000
          }
        }
      } else {
        return true
      }
    }
    var audio_sample = sinon.spy()
    var audio_sample_batch = sinon.spy(function (left, right, frames) {return frames})
    var input_state = sinon.spy(function () {return 0})
    var input_poll = sinon.spy(function () {})
    var video_refresh = sinon.spy(function () {})
    if (info.timeout) {
      this.timeout(info.timeout)
    }
    before(function (done) {
      System.import(`./core/${info.name}/core`).then(function (_core) {
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
    describe('properties', function () {
      it('api_version()', function () {
        expect(core.api_version()).to.equal(1)
        expect(core.api_version()).to.equal(core.API_VERSION)
      })
      it('get_region()', function () {
        expect(core.get_region()).to.equal(core['REGION_' + info.region])
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
      describe(rom.name, function () {
        beforeEach(function (done) {
          System.import(`./roms/${rom.name}!raw`).then(function (data) {
            core.load_game(new Uint8Array(data))
            done()
          }).catch(done)
        })
        afterEach(function () {
          core.unload_game()
        })
        it('running for 50 frames', function () {
          for (let i = 0; i < 50; i++) {
            core.run()
          }
          expect(input_poll.alwaysCalledWith())
          expect(video_refresh.alwaysCalledWith(sinon.match.object, sinon.match.number, sinon.match.number, sinon.match.number))
          expect(input_state.alwaysCalledWith(sinon.match.number, sinon.match.number, sinon.match.number, sinon.match.number))
          expect(audio_sample_batch.alwaysCalledWith(sinon.match.object, sinon.match.object, sinon.match.number))
        })
        it('mashing buttons', function () {
          // input_state.returns(1)
          for (let i = 0; i < 100; i++) {
            core.run()
          }
        })
        if (!rom.skip60) {
          it('fps >= 60', function () {
            const frames = 100
            this.timeout(1000 * frames / 60)
            for (let i = 0; i < frames; i++) {
              core.run()
            }
          })
        }
        if (!rom.skipSave) {
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
        }
      })
    })
  })
})
