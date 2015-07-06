# retrojs

This project compiles some libretro projects into nice CommonJS modules using Emscripten.

## Cores
These cores seem to work and are available from NPM:

* snes9x-next
* gambatte
* vba-next
* fceumm
* gw
* handy
* o2em
* picodrive
* vecx

## Callbacks
To run the cores you must define the following callbacks:

* core.video_refresh = function (data, width, height, pitch) {}
* core.environment = function (cmd, _data) {}
* core.audio_sample_batch = function (left, right, frames) {}
* core.audio_sample = function (left, right) {}
* core.input_poll = function () {}
* core.input_state = function (port, device, index, id) {}

## API
The API closely follows libretro.h with pointers converted into Javascript objects.

## Building
To build, you will need to run the bootstrapper script:

`sh
chmod +x script/bootstrap
./script/bootstrap
`

This will pull in all of the cores that can be built. Using emmake, you can compile the core. Each Makefile within core/* should create a .bc file. After which you can run ./script/build to create index.js files from the *.bc files. These js files will expose the libretro API once loaded.

## Testing
The test file test.html can be loaded in the browser to run after index.js files have been built.
