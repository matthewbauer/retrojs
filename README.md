# retrojs

This project compiles some libretro projects into nice CommonJS modules using Emscripten.

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

## Building
To build, you will need to do the following:

```sh
git clone --recursive https://github.com/matthewbauer/retrojs.git
cd retrojs
npm install
```

This will pull in all of the cores that can be built. Using emmake, you can compile the core. Each Makefile within core/* should create a .bc file. After which you can run ./script/build to create index.js files from the *.bc files. These js files will expose the libretro API once loaded.

## Testing
The test file test.html can be loaded in the browser to run after index.js files have been built.
