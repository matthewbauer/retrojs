# retrojs

This project compiles some libretro projects into nice CommonJS modules using Emscripten.

## Building
To build, you will need to have Node and Emscripten installed and run the following:

```sh
git clone --recursive https://github.com/matthewbauer/retrojs.git
cd retrojs
npm install
npm run build
```

## Testing
To run the tests from node:
```
npm test
```

The test file test.html can be loaded in the browser to run after index.js files have been built.

## Cores
These cores seem to work and are available from NPM:

* snes9x-next
* gambatte
* vba-next
* nestopia
* gw
* picodrive
* vecx
* virtualjaguar
* mupen64plus

## API
The API closely follows libretro.h with pointers converted into Javascript objects to abstract Emscripten memory.

* init
* deinit
* api_version
* reset
* run
* unload_game
* get_region
* cheat_reset
* get_memory_size
* serialize_size
* set_controller_port_device
* get_system_info
* get_system_av_info
* serialize
* unserialize
* load_game
* load_game_special
* get_memory_data
* set_audio_sample_batch
* set_video_refresh
* set_audio_sample
* set_environment
* set_input_state
* set_input_poll

Constants are exporeted as well. They are currently set to the 
