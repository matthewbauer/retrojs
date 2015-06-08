module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      compile:
        files: [
          expand: true
          src: ['libretro.coffee']
          ext: '.js'
        ]

  grunt.registerTask 'build', ['coffee:compile']
  grunt.registerTask 'default', ['build']
