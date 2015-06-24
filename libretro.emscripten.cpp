#include "libretro.h"
#include <emscripten/bind.h>

using namespace emscripten;

extern "C" {
  extern bool environment(unsigned cmd, void* data);
  extern void video_refresh(const void* data, unsigned width, unsigned height, size_t pitch);
  extern size_t audio_sample_batch(const int16_t *data, size_t frames);
  extern void audio_sample(int16_t left, int16_t right);
  extern void input_poll();
  extern int16_t input_state(unsigned port, unsigned device, unsigned index, unsigned id);

  void init() {
    retro_set_environment(&environment);
    retro_init();
    retro_set_video_refresh(&video_refresh);
    retro_set_audio_sample_batch(&audio_sample_batch);
    retro_set_audio_sample(&audio_sample);
    retro_set_input_poll(&input_poll);
    retro_set_input_state(&input_state);
  }

  EMSCRIPTEN_BINDINGS(my_module) {
    constant("API_VERSION", RETRO_API_VERSION);
    constant("DEVICE_TYPE_SHIFT", RETRO_DEVICE_TYPE_SHIFT);
    constant("DEVICE_MASK", RETRO_DEVICE_MASK);
    constant("DEVICE_NONE", RETRO_DEVICE_NONE);
    constant("DEVICE_JOYPAD", RETRO_DEVICE_JOYPAD);
    constant("DEVICE_MOUSE", RETRO_DEVICE_MOUSE);
    constant("DEVICE_KEYBOARD", RETRO_DEVICE_KEYBOARD);
    constant("DEVICE_LIGHTGUN", RETRO_DEVICE_LIGHTGUN);
    constant("DEVICE_ANALOG", RETRO_DEVICE_ANALOG);
    constant("DEVICE_POINTER", RETRO_DEVICE_POINTER);
    constant("DEVICE_ID_JOYPAD_B", RETRO_DEVICE_ID_JOYPAD_B);
    constant("DEVICE_ID_JOYPAD_Y", RETRO_DEVICE_ID_JOYPAD_Y);
    constant("DEVICE_ID_JOYPAD_SELECT", RETRO_DEVICE_ID_JOYPAD_SELECT);
    constant("DEVICE_ID_JOYPAD_START", RETRO_DEVICE_ID_JOYPAD_START);
    constant("DEVICE_ID_JOYPAD_UP", RETRO_DEVICE_ID_JOYPAD_UP);
    constant("DEVICE_ID_JOYPAD_DOWN", RETRO_DEVICE_ID_JOYPAD_DOWN);
    constant("DEVICE_ID_JOYPAD_LEFT", RETRO_DEVICE_ID_JOYPAD_LEFT);
    constant("DEVICE_ID_JOYPAD_RIGHT", RETRO_DEVICE_ID_JOYPAD_RIGHT);
    constant("DEVICE_ID_JOYPAD_A", RETRO_DEVICE_ID_JOYPAD_A);
    constant("DEVICE_ID_JOYPAD_X", RETRO_DEVICE_ID_JOYPAD_X);
    constant("DEVICE_ID_JOYPAD_L", RETRO_DEVICE_ID_JOYPAD_L);
    constant("DEVICE_ID_JOYPAD_R", RETRO_DEVICE_ID_JOYPAD_R);
    constant("DEVICE_ID_JOYPAD_L2", RETRO_DEVICE_ID_JOYPAD_L2);
    constant("DEVICE_ID_JOYPAD_R2", RETRO_DEVICE_ID_JOYPAD_R2);
    constant("DEVICE_ID_JOYPAD_L3", RETRO_DEVICE_ID_JOYPAD_L3);
    constant("DEVICE_ID_JOYPAD_R3", RETRO_DEVICE_ID_JOYPAD_R3);
    constant("DEVICE_INDEX_ANALOG_LEFT", RETRO_DEVICE_INDEX_ANALOG_LEFT);
    constant("DEVICE_INDEX_ANALOG_RIGHT", RETRO_DEVICE_INDEX_ANALOG_RIGHT);
    constant("DEVICE_ID_ANALOG_X", RETRO_DEVICE_ID_ANALOG_X);
    constant("DEVICE_ID_ANALOG_Y", RETRO_DEVICE_ID_ANALOG_Y);
    constant("DEVICE_ID_MOUSE_X", RETRO_DEVICE_ID_MOUSE_X);
    constant("DEVICE_ID_MOUSE_Y", RETRO_DEVICE_ID_MOUSE_Y);
    constant("DEVICE_ID_MOUSE_LEFT", RETRO_DEVICE_ID_MOUSE_LEFT);
    constant("DEVICE_ID_MOUSE_RIGHT", RETRO_DEVICE_ID_MOUSE_RIGHT);
    constant("DEVICE_ID_MOUSE_WHEELUP", RETRO_DEVICE_ID_MOUSE_WHEELUP);
    constant("DEVICE_ID_MOUSE_WHEELDOWN", RETRO_DEVICE_ID_MOUSE_WHEELDOWN);
    constant("DEVICE_ID_MOUSE_MIDDLE", RETRO_DEVICE_ID_MOUSE_MIDDLE);
    constant("DEVICE_ID_MOUSE_HORIZ_WHEELUP", RETRO_DEVICE_ID_MOUSE_HORIZ_WHEELUP);
    constant("DEVICE_ID_MOUSE_HORIZ_WHEELDOWN", RETRO_DEVICE_ID_MOUSE_HORIZ_WHEELDOWN);
    constant("DEVICE_ID_LIGHTGUN_X", RETRO_DEVICE_ID_LIGHTGUN_X);
    constant("DEVICE_ID_LIGHTGUN_Y", RETRO_DEVICE_ID_LIGHTGUN_Y);
    constant("DEVICE_ID_LIGHTGUN_TRIGGER", RETRO_DEVICE_ID_LIGHTGUN_TRIGGER);
    constant("DEVICE_ID_LIGHTGUN_CURSOR", RETRO_DEVICE_ID_LIGHTGUN_CURSOR);
    constant("DEVICE_ID_LIGHTGUN_TURBO", RETRO_DEVICE_ID_LIGHTGUN_TURBO);
    constant("DEVICE_ID_LIGHTGUN_PAUSE", RETRO_DEVICE_ID_LIGHTGUN_PAUSE);
    constant("DEVICE_ID_LIGHTGUN_START", RETRO_DEVICE_ID_LIGHTGUN_START);
    constant("DEVICE_ID_POINTER_X", RETRO_DEVICE_ID_POINTER_X);
    constant("DEVICE_ID_POINTER_Y", RETRO_DEVICE_ID_POINTER_Y);
    constant("DEVICE_ID_POINTER_PRESSED", RETRO_DEVICE_ID_POINTER_PRESSED);
    constant("REGION_NTSC", RETRO_REGION_NTSC);
    constant("REGION_PAL", RETRO_REGION_PAL);
    constant("MEMORY_MASK", RETRO_MEMORY_MASK);
    constant("MEMORY_SAVE_RAM", RETRO_MEMORY_SAVE_RAM);
    constant("MEMORY_RTC", RETRO_MEMORY_RTC);
    constant("MEMORY_SYSTEM_RAM", RETRO_MEMORY_SYSTEM_RAM);
    constant("MEMORY_VIDEO_RAM", RETRO_MEMORY_VIDEO_RAM);
    constant("ENVIRONMENT_EXPERIMENTAL", RETRO_ENVIRONMENT_EXPERIMENTAL);
    constant("ENVIRONMENT_PRIVATE", RETRO_ENVIRONMENT_PRIVATE);
    constant("ENVIRONMENT_SET_ROTATION", RETRO_ENVIRONMENT_SET_ROTATION);
    constant("ENVIRONMENT_GET_OVERSCAN", RETRO_ENVIRONMENT_GET_OVERSCAN);
    constant("ENVIRONMENT_GET_CAN_DUPE", RETRO_ENVIRONMENT_GET_CAN_DUPE);
    constant("ENVIRONMENT_SET_MESSAGE", RETRO_ENVIRONMENT_SET_MESSAGE);
    constant("ENVIRONMENT_SHUTDOWN", RETRO_ENVIRONMENT_SHUTDOWN);
    constant("ENVIRONMENT_SET_PERFORMANCE_LEVEL", RETRO_ENVIRONMENT_SET_PERFORMANCE_LEVEL);
    constant("ENVIRONMENT_GET_SYSTEM_DIRECTORY", RETRO_ENVIRONMENT_GET_SYSTEM_DIRECTORY);
    constant("ENVIRONMENT_SET_PIXEL_FORMAT", RETRO_ENVIRONMENT_SET_PIXEL_FORMAT);
    constant("ENVIRONMENT_SET_INPUT_DESCRIPTORS", RETRO_ENVIRONMENT_SET_INPUT_DESCRIPTORS);
    constant("ENVIRONMENT_SET_KEYBOARD_CALLBACK", RETRO_ENVIRONMENT_SET_KEYBOARD_CALLBACK);
    constant("ENVIRONMENT_SET_DISK_CONTROL_INTERFACE", RETRO_ENVIRONMENT_SET_DISK_CONTROL_INTERFACE);
    constant("ENVIRONMENT_SET_HW_RENDER", RETRO_ENVIRONMENT_SET_HW_RENDER);
    constant("ENVIRONMENT_GET_VARIABLE", RETRO_ENVIRONMENT_GET_VARIABLE);
    constant("ENVIRONMENT_SET_VARIABLES", RETRO_ENVIRONMENT_SET_VARIABLES);
    constant("ENVIRONMENT_GET_VARIABLE_UPDATE", RETRO_ENVIRONMENT_GET_VARIABLE_UPDATE);
    constant("ENVIRONMENT_SET_SUPPORT_NO_GAME", RETRO_ENVIRONMENT_SET_SUPPORT_NO_GAME);
    constant("ENVIRONMENT_GET_LIBRETRO_PATH", RETRO_ENVIRONMENT_GET_LIBRETRO_PATH);
    constant("ENVIRONMENT_SET_AUDIO_CALLBACK", RETRO_ENVIRONMENT_SET_AUDIO_CALLBACK);
    constant("ENVIRONMENT_SET_FRAME_TIME_CALLBACK", RETRO_ENVIRONMENT_SET_FRAME_TIME_CALLBACK);
    constant("ENVIRONMENT_GET_RUMBLE_INTERFACE", RETRO_ENVIRONMENT_GET_RUMBLE_INTERFACE);
    constant("ENVIRONMENT_GET_INPUT_DEVICE_CAPABILITIES", RETRO_ENVIRONMENT_GET_INPUT_DEVICE_CAPABILITIES);
    constant("ENVIRONMENT_GET_SENSOR_INTERFACE", RETRO_ENVIRONMENT_GET_SENSOR_INTERFACE);
    constant("ENVIRONMENT_GET_CAMERA_INTERFACE", RETRO_ENVIRONMENT_GET_CAMERA_INTERFACE);
    constant("ENVIRONMENT_GET_LOG_INTERFACE", RETRO_ENVIRONMENT_GET_LOG_INTERFACE);
    constant("ENVIRONMENT_GET_PERF_INTERFACE", RETRO_ENVIRONMENT_GET_PERF_INTERFACE);
    constant("ENVIRONMENT_GET_LOCATION_INTERFACE", RETRO_ENVIRONMENT_GET_LOCATION_INTERFACE);
    constant("ENVIRONMENT_GET_CORE_ASSETS_DIRECTORY", RETRO_ENVIRONMENT_GET_CORE_ASSETS_DIRECTORY);
    constant("ENVIRONMENT_GET_SAVE_DIRECTORY", RETRO_ENVIRONMENT_GET_SAVE_DIRECTORY);
    constant("ENVIRONMENT_SET_SYSTEM_AV_INFO", RETRO_ENVIRONMENT_SET_SYSTEM_AV_INFO);
    constant("ENVIRONMENT_SET_PROC_ADDRESS_CALLBACK", RETRO_ENVIRONMENT_SET_PROC_ADDRESS_CALLBACK);
    constant("ENVIRONMENT_SET_SUBSYSTEM_INFO", RETRO_ENVIRONMENT_SET_SUBSYSTEM_INFO);
    constant("ENVIRONMENT_SET_CONTROLLER_INFO", RETRO_ENVIRONMENT_SET_CONTROLLER_INFO);
    constant("ENVIRONMENT_SET_MEMORY_MAPS", RETRO_ENVIRONMENT_SET_MEMORY_MAPS);
    constant("ENVIRONMENT_SET_GEOMETRY", RETRO_ENVIRONMENT_SET_GEOMETRY);
    constant("ENVIRONMENT_GET_USERNAME", RETRO_ENVIRONMENT_GET_USERNAME);
    constant("ENVIRONMENT_GET_LANGUAGE", RETRO_ENVIRONMENT_GET_LANGUAGE);
    constant("MEMDESC_CONST", RETRO_MEMDESC_CONST);
    constant("MEMDESC_BIGENDIAN", RETRO_MEMDESC_BIGENDIAN);
    constant("MEMDESC_ALIGN_2", RETRO_MEMDESC_ALIGN_2);
    constant("MEMDESC_ALIGN_4", RETRO_MEMDESC_ALIGN_4);
    constant("MEMDESC_ALIGN_8", RETRO_MEMDESC_ALIGN_8);
    constant("MEMDESC_MINSIZE_2", RETRO_MEMDESC_MINSIZE_2);
    constant("MEMDESC_MINSIZE_4", RETRO_MEMDESC_MINSIZE_4);
    constant("MEMDESC_MINSIZE_8", RETRO_MEMDESC_MINSIZE_8);
    constant("SIMD_SSE", RETRO_SIMD_SSE);
    constant("SIMD_SSE2", RETRO_SIMD_SSE2);
    constant("SIMD_VMX", RETRO_SIMD_VMX);
    constant("SIMD_VMX128", RETRO_SIMD_VMX128);
    constant("SIMD_AVX", RETRO_SIMD_AVX);
    constant("SIMD_NEON", RETRO_SIMD_NEON);
    constant("SIMD_SSE3", RETRO_SIMD_SSE3);
    constant("SIMD_SSSE3", RETRO_SIMD_SSSE3);
    constant("SIMD_MMX", RETRO_SIMD_MMX);
    constant("SIMD_MMXEXT", RETRO_SIMD_MMXEXT);
    constant("SIMD_SSE4", RETRO_SIMD_SSE4);
    constant("SIMD_SSE42", RETRO_SIMD_SSE42);
    constant("SIMD_AVX2", RETRO_SIMD_AVX2);
    constant("SIMD_VFPU", RETRO_SIMD_VFPU);
    constant("SIMD_PS", RETRO_SIMD_PS);
    constant("SIMD_AES", RETRO_SIMD_AES);
    constant("SENSOR_ACCELEROMETER_X", RETRO_SENSOR_ACCELEROMETER_X);
    constant("SENSOR_ACCELEROMETER_Y", RETRO_SENSOR_ACCELEROMETER_Y);
    constant("SENSOR_ACCELEROMETER_Z", RETRO_SENSOR_ACCELEROMETER_Z);
    constant("HW_FRAME_BUFFER_VALID", RETRO_HW_FRAME_BUFFER_VALID);
    enum_<retro_language>("language")
      .value("LANGUAGE_DUMMY", RETRO_LANGUAGE_DUMMY)
      .value("LANGUAGE_LAST", RETRO_LANGUAGE_LAST)
      .value("LANGUAGE_CHINESE_SIMPLIFIED", RETRO_LANGUAGE_CHINESE_SIMPLIFIED)
      .value("LANGUAGE_CHINESE_TRADITIONAL", RETRO_LANGUAGE_CHINESE_TRADITIONAL)
      .value("LANGUAGE_KOREAN", RETRO_LANGUAGE_KOREAN)
      .value("LANGUAGE_RUSSIAN", RETRO_LANGUAGE_RUSSIAN)
      .value("LANGUAGE_PORTUGUESE", RETRO_LANGUAGE_PORTUGUESE)
      .value("LANGUAGE_DUTCH", RETRO_LANGUAGE_DUTCH)
      .value("LANGUAGE_ITALIAN", RETRO_LANGUAGE_ITALIAN)
      .value("LANGUAGE_GERMAN", RETRO_LANGUAGE_GERMAN)
      .value("LANGUAGE_SPANISH", RETRO_LANGUAGE_SPANISH)
      .value("LANGUAGE_FRENCH", RETRO_LANGUAGE_FRENCH)
      .value("LANGUAGE_JAPANESE", RETRO_LANGUAGE_JAPANESE)
      .value("LANGUAGE_ENGLISH", RETRO_LANGUAGE_ENGLISH);
    enum_<retro_key>("key")
      .value("K_DUMMY", RETROK_DUMMY)
      .value("K_LAST", RETROK_LAST)
      .value("K_UNDO", RETROK_UNDO)
      .value("K_EURO", RETROK_EURO)
      .value("K_POWER", RETROK_POWER)
      .value("K_MENU", RETROK_MENU)
      .value("K_BREAK", RETROK_BREAK)
      .value("K_SYSREQ", RETROK_SYSREQ)
      .value("K_PRINT", RETROK_PRINT)
      .value("K_HELP", RETROK_HELP)
      .value("K_COMPOSE", RETROK_COMPOSE)
      .value("K_MODE", RETROK_MODE)
      .value("K_RSUPER", RETROK_RSUPER)
      .value("K_LSUPER", RETROK_LSUPER)
      .value("K_LMETA", RETROK_LMETA)
      .value("K_RMETA", RETROK_RMETA)
      .value("K_LALT", RETROK_LALT)
      .value("K_RALT", RETROK_RALT)
      .value("K_LCTRL", RETROK_LCTRL)
      .value("K_RCTRL", RETROK_RCTRL)
      .value("K_LSHIFT", RETROK_LSHIFT)
      .value("K_RSHIFT", RETROK_RSHIFT)
      .value("K_SCROLLOCK", RETROK_SCROLLOCK)
      .value("K_CAPSLOCK", RETROK_CAPSLOCK)
      .value("K_NUMLOCK", RETROK_NUMLOCK)
      .value("K_F15", RETROK_F15)
      .value("K_F14", RETROK_F14)
      .value("K_F13", RETROK_F13)
      .value("K_F12", RETROK_F12)
      .value("K_F11", RETROK_F11)
      .value("K_F10", RETROK_F10)
      .value("K_F9", RETROK_F9)
      .value("K_F8", RETROK_F8)
      .value("K_F7", RETROK_F7)
      .value("K_F6", RETROK_F6)
      .value("K_F5", RETROK_F5)
      .value("K_F4", RETROK_F4)
      .value("K_F3", RETROK_F3)
      .value("K_F2", RETROK_F2)
      .value("K_F1", RETROK_F1)
      .value("K_PAGEDOWN", RETROK_PAGEDOWN)
      .value("K_PAGEUP", RETROK_PAGEUP)
      .value("K_END", RETROK_END)
      .value("K_HOME", RETROK_HOME)
      .value("K_INSERT", RETROK_INSERT)
      .value("K_LEFT", RETROK_LEFT)
      .value("K_RIGHT", RETROK_RIGHT)
      .value("K_DOWN", RETROK_DOWN)
      .value("K_UP", RETROK_UP)
      .value("K_KP_EQUALS", RETROK_KP_EQUALS)
      .value("K_KP_ENTER", RETROK_KP_ENTER)
      .value("K_KP_PLUS", RETROK_KP_PLUS)
      .value("K_KP_MINUS", RETROK_KP_MINUS)
      .value("K_KP_MULTIPLY", RETROK_KP_MULTIPLY)
      .value("K_KP_DIVIDE", RETROK_KP_DIVIDE)
      .value("K_KP_PERIOD", RETROK_KP_PERIOD)
      .value("K_KP9", RETROK_KP9)
      .value("K_KP8", RETROK_KP8)
      .value("K_KP7", RETROK_KP7)
      .value("K_KP6", RETROK_KP6)
      .value("K_KP5", RETROK_KP5)
      .value("K_KP4", RETROK_KP4)
      .value("K_KP3", RETROK_KP3)
      .value("K_KP2", RETROK_KP2)
      .value("K_KP1", RETROK_KP1)
      .value("K_KP0", RETROK_KP0)
      .value("K_DELETE", RETROK_DELETE)
      .value("K_z", RETROK_z)
      .value("K_y", RETROK_y)
      .value("K_x", RETROK_x)
      .value("K_w", RETROK_w)
      .value("K_v", RETROK_v)
      .value("K_u", RETROK_u)
      .value("K_t", RETROK_t)
      .value("K_s", RETROK_s)
      .value("K_r", RETROK_r)
      .value("K_q", RETROK_q)
      .value("K_p", RETROK_p)
      .value("K_o", RETROK_o)
      .value("K_n", RETROK_n)
      .value("K_m", RETROK_m)
      .value("K_l", RETROK_l)
      .value("K_k", RETROK_k)
      .value("K_j", RETROK_j)
      .value("K_i", RETROK_i)
      .value("K_h", RETROK_h)
      .value("K_g", RETROK_g)
      .value("K_f", RETROK_f)
      .value("K_e", RETROK_e)
      .value("K_d", RETROK_d)
      .value("K_c", RETROK_c)
      .value("K_b", RETROK_b)
      .value("K_a", RETROK_a)
      .value("K_BACKQUOTE", RETROK_BACKQUOTE)
      .value("K_UNDERSCORE", RETROK_UNDERSCORE)
      .value("K_CARET", RETROK_CARET)
      .value("K_RIGHTBRACKET", RETROK_RIGHTBRACKET)
      .value("K_BACKSLASH", RETROK_BACKSLASH)
      .value("K_LEFTBRACKET", RETROK_LEFTBRACKET)
      .value("K_AT", RETROK_AT)
      .value("K_QUESTION", RETROK_QUESTION)
      .value("K_GREATER", RETROK_GREATER)
      .value("K_EQUALS", RETROK_EQUALS)
      .value("K_LESS", RETROK_LESS)
      .value("K_SEMICOLON", RETROK_SEMICOLON)
      .value("K_COLON", RETROK_COLON)
      .value("K_9", RETROK_9)
      .value("K_8", RETROK_8)
      .value("K_7", RETROK_7)
      .value("K_6", RETROK_6)
      .value("K_5", RETROK_5)
      .value("K_4", RETROK_4)
      .value("K_3", RETROK_3)
      .value("K_2", RETROK_2)
      .value("K_1", RETROK_1)
      .value("K_0", RETROK_0)
      .value("K_SLASH", RETROK_SLASH)
      .value("K_PERIOD", RETROK_PERIOD)
      .value("K_MINUS", RETROK_MINUS)
      .value("K_COMMA", RETROK_COMMA)
      .value("K_PLUS", RETROK_PLUS)
      .value("K_ASTERISK", RETROK_ASTERISK)
      .value("K_RIGHTPAREN", RETROK_RIGHTPAREN)
      .value("K_LEFTPAREN", RETROK_LEFTPAREN)
      .value("K_QUOTE", RETROK_QUOTE)
      .value("K_AMPERSAND", RETROK_AMPERSAND)
      .value("K_DOLLAR", RETROK_DOLLAR)
      .value("K_HASH", RETROK_HASH)
      .value("K_QUOTEDBL", RETROK_QUOTEDBL)
      .value("K_EXCLAIM", RETROK_EXCLAIM)
      .value("K_SPACE", RETROK_SPACE)
      .value("K_ESCAPE", RETROK_ESCAPE)
      .value("K_PAUSE", RETROK_PAUSE)
      .value("K_RETURN", RETROK_RETURN)
      .value("K_CLEAR", RETROK_CLEAR)
      .value("K_TAB", RETROK_TAB)
      .value("K_BACKSPACE", RETROK_BACKSPACE)
      .value("K_FIRST", RETROK_FIRST)
      .value("K_UNKNOWN", RETROK_UNKNOWN);
    enum_<retro_mod>("mod")
      .value("MOD_DUMMY", RETROKMOD_DUMMY)
      .value("MOD_SCROLLOCK", RETROKMOD_SCROLLOCK)
      .value("MOD_CAPSLOCK", RETROKMOD_CAPSLOCK)
      .value("MOD_NUMLOCK", RETROKMOD_NUMLOCK)
      .value("MOD_META", RETROKMOD_META)
      .value("MOD_ALT", RETROKMOD_ALT)
      .value("MOD_CTRL", RETROKMOD_CTRL)
      .value("MOD_SHIFT", RETROKMOD_SHIFT)
      .value("MOD_NONE", RETROKMOD_NONE);
    enum_<retro_log_level>("log_level")
      .value("LOG_DUMMY", RETRO_LOG_DUMMY)
      .value("LOG_ERROR", RETRO_LOG_ERROR)
      .value("LOG_WARN", RETRO_LOG_WARN)
      .value("LOG_INFO", RETRO_LOG_INFO)
      .value("LOG_DEBUG", RETRO_LOG_DEBUG);
    enum_<retro_sensor_action>("sensor_action")
      .value("SENSOR_DUMMY", RETRO_SENSOR_DUMMY)
      .value("SENSOR_ACCELEROMETER_DISABLE", RETRO_SENSOR_ACCELEROMETER_DISABLE)
      .value("SENSOR_ACCELEROMETER_ENABLE", RETRO_SENSOR_ACCELEROMETER_ENABLE);
    enum_<retro_camera_buffer>("camera_buffer")
      .value("CAMERA_BUFFER_DUMMY", RETRO_CAMERA_BUFFER_DUMMY)
      .value("CAMERA_BUFFER_RAW_FRAMEBUFFER", RETRO_CAMERA_BUFFER_RAW_FRAMEBUFFER)
      .value("CAMERA_BUFFER_OPENGL_TEXTURE", RETRO_CAMERA_BUFFER_OPENGL_TEXTURE);
    enum_<retro_rumble_effect>("rumble_effect")
      .value("RUMBLE_DUMMY", RETRO_RUMBLE_DUMMY)
      .value("RUMBLE_WEAK", RETRO_RUMBLE_WEAK)
      .value("RUMBLE_STRONG", RETRO_RUMBLE_STRONG);
    enum_<retro_hw_context_type>("hw_context_type")
      .value("HW_CONTEXT_DUMMY", RETRO_HW_CONTEXT_DUMMY)
      .value("HW_CONTEXT_OPENGLES_VERSION", RETRO_HW_CONTEXT_OPENGLES_VERSION)
      .value("HW_CONTEXT_OPENGLES3", RETRO_HW_CONTEXT_OPENGLES3)
      .value("HW_CONTEXT_OPENGL_CORE", RETRO_HW_CONTEXT_OPENGL_CORE)
      .value("HW_CONTEXT_OPENGLES2", RETRO_HW_CONTEXT_OPENGLES2)
      .value("HW_CONTEXT_OPENGL", RETRO_HW_CONTEXT_OPENGL)
      .value("HW_CONTEXT_NONE", RETRO_HW_CONTEXT_NONE);
    enum_<retro_pixel_format>("pixel_format")
      .value("PIXEL_FORMAT_UNKNOWN", RETRO_PIXEL_FORMAT_UNKNOWN)
      .value("PIXEL_FORMAT_RGB565", RETRO_PIXEL_FORMAT_RGB565)
      .value("PIXEL_FORMAT_XRGB8888", RETRO_PIXEL_FORMAT_XRGB8888)
      .value("PIXEL_FORMAT_0RGB1555", RETRO_PIXEL_FORMAT_0RGB1555);

    // these methods don't have pointers so embind handles them directly
    function("init", &init);
    function("deinit", &retro_deinit);
    function("api_version", &retro_api_version);
    function("reset", &retro_reset);
    function("run", &retro_run);
    function("unload_game", &retro_unload_game);
    function("get_region", &retro_get_region);
    function("cheat_reset", &retro_cheat_reset);
    function("get_memory_size", &retro_get_memory_size);
    function("serialize_size", &retro_serialize_size);
    function("set_controller_port_device", &retro_set_controller_port_device);
  }
}
