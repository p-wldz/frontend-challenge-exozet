module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
          all: ['Gruntfile.js', 'app/src/js/*.js']
        },
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: 'app/src/js/index.js',
            dest: 'app/dist/js/index.min.js'
          }
        },
        sass: {
          dist: {
              options: {
                style: 'expanded'
              },
              files: {'app/src/css/style.css': 'app/src/scss/style.scss'}
          }
        },
        watch: {
          css: {
            files: 'app/**/*.scss',
            tasks: ['sass']
          },
          js: {
            files: 'app/src/js/*.js',
            tasks: ['concat']
          }
        },
        concat: {
          options: {
            separator: ';'
          },
          dist: {
            src: ['app/src/**/*.js'],
            dest: 'app/src/js/index.js'
          }
        },
        cssmin: {
          target: {
            files: [
              {
                expand: true,
                cwd: 'app/src/css',
                src: ['*.css'],
                dest: 'app/dist/css',
                ext: '.min.css'
              }
            ]
          }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', ['jshint', 'sass', 'concat', 'cssmin', 'uglify']);
};
