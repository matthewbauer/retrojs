/* globals describe, it, beforeEach, afterEach */

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

const cores = [
  {
    name: 'gambatte',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: 'snes9x-next',
    roms: [
      {
        name: 'nwarp.smc'
      },
      {
        name: 'Super Mario World.smc'
      }
    ],
    system_info: {
      library_name: 'Snes9X Next',
      library_version: 'v1.52.4',
      valid_extensions: 'smc|fig|sfc|gd3|gd7|dx2|bsx|swc',
      need_fullpath: false,
      block_extract: false
    },
    region: 'REGION_NTSC'
  },
  {
    name: 'tyrquake',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: 'vba-next',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: '4do',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: 'bluemsx',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: 'fceumm',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: 'gw',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: 'handy',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: 'o2em',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: 'picodrive',
    roms: [],
    region: 'REGION_NTSC'
  },
  {
    name: 'vecx',
    roms: [],
    region: 'REGION_PAL'
  }
]

cores.forEach(function (info) {
  describe(info.name, function () {
    let core
    beforeEach(function (done) {
      System.import(`core:${info.name}`).then(function (_core) {
        core = _core
        core.log = sinon.spy()
        core.environment = sinon.spy(function (cmd, _data) {
          if (cmd === core.ENVIRONMENT_GET_LOG_INTERFACE) {
            return core.log
          }
        })
        core.audio_sample = sinon.spy()
        core.audio_sample_batch = sinon.spy(function (left, right, frames) {
          return frames
        })
        core.input_state = sinon.spy(function () {
          return 0
        })
        core.input_poll = sinon.spy()
        core.video_refresh = sinon.spy()
        core.init()
      }).then(done, done)
    })
    describe('properties', function () {
      it('API_VERSION === 1', function () {
        expect(core.API_VERSION).to.equal(1)
      })
      it('api_version()', function () {
        expect(core.api_version()).to.equal(1)
        expect(core.api_version()).to.equal(core.API_VERSION)
      })
      it('get_region()', function () {
        expect(core.get_region()).to.equal(core[info.region])
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
        it('get_system_info() outputs correctly', function () {
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
    describe('memory', function () {
      it('get_memory_size', function () {
        expect(core.get_memory_size(core.MEMORY_SAVE_RAM)).to.be.a('number')
        expect(core.get_memory_size(core.MEMORY_RTC)).to.be.a('number')
        expect(core.get_memory_size(core.MEMORY_SYSTEM_RAM)).to.be.a('number')
        expect(core.get_memory_size(core.MEMORY_VIDEO_RAM)).to.be.a('number')
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
          }).then(done, done)
        })
        afterEach(function () {
          core.unload_game()
        })
        it('running for 50 frames', function () {
          for (let i = 0; i < 50; i++) {
            core.run()
          }
          expect(core.input_poll.alwaysCalledWith())
          expect(core.video_refresh.alwaysCalledWith(sinon.match.object, sinon.match.number, sinon.match.number, sinon.match.number))
          expect(core.input_state.alwaysCalledWith(sinon.match.number, sinon.match.number, sinon.match.number, sinon.match.number))
          expect(core.audio_sample_batch.alwaysCalledWith(sinon.match.object, sinon.match.object, sinon.match.number))
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
})