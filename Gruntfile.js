module.exports = function(grunt) {

  var // HTML templates
      templates = {
          'build/index.html':                'src/views/index.html',
          'build/partials/about.html':       'src/views/partials/about.html',
          'build/partials/list.html':        'src/views/partials/list.html',
          'build/partials/translate.html':   'src/views/partials/translate.html',
        };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    templates: templates,
    watch: {
      files: [
        'src/less/*',
        'src/js/*',
        'src/js/controllers/*',
        'src/views/*',
        'src/views/partials/*',
        'GruntFile.js'
      ],
      tasks: [
        'preprocess:dev',
        'less:dev',
        'concat',
      ]
    },
    shell: {
      fetchtranslations: {
        command: 'python scripts/fetch-translations.py',
        options: {
          stdout: true
        }
      },
      bowerinstall: {
        command: 'bower install'
      },
      gitclone: {
        command: 'git clone https://github.com/koppi/iso-country-flags-svg-collection.git src/libs/iso-country-flags-svg-collection/'
      }
    },
    favicons: {
      options: {
        trueColor: true,
        tileColor: '#f3c936',
        appleTouchBackgroundColor: '#f3c936',
        html: 'src/views/icons.html',
        HTMLPrefix: 'assets/img/icons/'
      },
      icons: {
        src: 'src/img/icon.png',
        dest: 'build/assets/img/icons'
      }
    },
    preprocess : {
      options: {
        context : {
          NAME: '<%= pkg.name %>',
          AUTHOR: '<%= pkg.author %>',
          VERSION: '<%= pkg.version %>',
          CACHEBUSTER: '<%= grunt.template.today("mdhMs") %>',
          DESCRIPTION: '<%= pkg.description %>',
          OG_IMG: 'assets/img/og_image.png',
          HOMEPAGE: '<%= pkg.homepage %>'
        }
      },
      prod : {
        options: {
          context : {
            ENV : 'prod',
          }
        },
        files : templates
      },
      dev : {
        options: {
          context : {
            ENV : 'dev',
          }
        },
        files : templates
      }
    },
    less: {
      dev: {
        options: {
          paths: ['build/assets/css']
        },
        files: {
          'build/assets/css/app.css': 'src/less/app.less'
        }
      },
      prod: {
        options: {
          paths: ['build/assets/css'],
          cleancss: true
        },
        files: {
          'build/assets/css/app.min.css': 'src/less/app.less'
        }
      }
    },
    concat: {
      options: {
        banner: 'var phrasebookVer="<%= pkg.version %>",phrasebookDay="<%= grunt.template.today("yyyy-mm-dd") %>";\n'
      },
      dist : {
        src: [
          'src/vendor/jquery/jquery.js',
          'src/vendor/angular/angular.js',
          'src/vendor/angular-animate/angular-animate.js',
          'src/vendor/angular-resource/angular-resource.js',
          'src/vendor/angular-route/angular-route.js',
          'src/vendor/angular-sanitize/angular-sanitize.js',
          'src/vendor/angular-touch/angular-touch.js',
          'src/vendor/angular-cookies/angular-cookies.js',
          'src/vendor/bootstrap/js/button.js',
          'src/vendor/bootstrap/js/dropdown.js',
          'src/js/locales.js',
          'src/js/app.js',
          'src/js/configs.js',
          'src/js/controllers/navigation.js',
          'src/js/controllers/list.js',
          'src/js/controllers/about.js',
          'src/js/controllers/translate.js'
          ],
        dest: 'build/assets/js/app.js'
      }
    },
    uglify: {
      options: {
        mangle: false, // Angular doesn't like mangling...
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/assets/js/app.js',
        dest: 'build/assets/js/app.min.js'
      }
    },
    copy: {
      main: {
        files: [
            {
                src: 'src/img/og_image.png',
                dest: 'build/assets/img/og_image.png'
            },
            {
                src: 'src/img/hitchwiki.png',
                dest: 'build/assets/img/hitchwiki.png'
            },/*
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'src/views/partials/*',
                dest: 'build/partials'
            },*/
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'src/locale-json/*',
                dest: 'build/assets/locale/'
            },
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'src/vendor/font-awesome/fonts/*',
                dest: 'build/assets/fonts/'
            },
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'src/libs/iso-country-flags-svg-collection/svg/country-squared/*',
                dest: 'build/assets/img/flags/'
            }/*,
            {
                src: 'src/libs/iso-country-flags-svg-collection/iso-3166-1.json',
                dest: 'build/assets/locale/iso-3166-1.json',
            }*/

        ]
      },
    },
    clean: {
      reset: [
        "build",
        "src/libs",
        "src/vendor",
        "src/locale",
        "src/locale-json",
        "src/js/locales.js",
        "src/views/icons.html"
      ]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('reset', [
                       'clean'
                     ]);

  grunt.registerTask('prod', [
                       'preprocess:prod',
                       'less:prod',
                       'concat',
                       'uglify'
                     ]);

  grunt.registerTask('dev', [
                       'preprocess:dev',
                       'less:dev',
                       'concat',
                       'watch'
                     ]);

  grunt.registerTask('build', [
                       'shell',
                       'favicons',
                       'preprocess:prod',
                       'less:prod',
                       'concat',
                       'uglify',
                       'copy'
                       //'manifest'
                     ]);

    // Default task
    grunt.registerTask('default', 'build');

};