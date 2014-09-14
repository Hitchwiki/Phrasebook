module.exports = function(grunt) {

  // HTML templates
  var templates = {
    'build/index.html':                'src/views/index.html',
    'build/partials/about.html':       'src/views/partials/about.html',
    'build/partials/list.html':        'src/views/partials/list.html',
    'build/partials/translate.html':   'src/views/partials/translate.html',
    'build/docs/index.html':           'src/docs/index.html',
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    templates: templates,
    watch: {
      font: {
        files: [
          'src/fontello-config.json',
        ],
        tasks: [
          'fontello',
          'less:dev'
        ]
      },
      less: {
        files: [
          'src/less/*',
          'src/vendor/fontello-css/*',
        ],
        tasks: [
          'less:dev',
        ]
      },
      js: {
        files: [
          'gruntfile.js',
          'src/js/*',
          'src/js/controllers/*'
        ],
        tasks: [
          'concat'
        ]
      },
      views: {
        files: [
          'src/views/*',
          'src/views/partials/*'
        ],
        tasks: [
          'preprocess:dev'
        ]
      },
    },
    favicons: {
      options: {
        trueColor: true,
        tileColor: '#f3c936',
        appleTouchBackgroundColor: '#f3c936',
        html: 'src/views/_icons.html',
        HTMLPrefix: 'assets/img/icons/',
      },
      icons: {
        src: 'src/img/icon.png',
        dest: 'build/assets/img/icons',
      }
    },
    shell: {
      phonegapicons: {
        command: [
                'convert build/assets/img/icons/apple-touch-icon-152x152-precomposed.png -resize 29x29 build/assets/img/icons/apple-touch-icon-29x29-precomposed.png',
                'convert build/assets/img/icons/apple-touch-icon-152x152-precomposed.png -resize 58x58 build/assets/img/icons/apple-touch-icon-58x58-precomposed.png',
                'convert build/assets/img/icons/apple-touch-icon-152x152-precomposed.png -resize 40x40 build/assets/img/icons/apple-touch-icon-40x40-precomposed.png',
                'convert build/assets/img/icons/apple-touch-icon-152x152-precomposed.png -resize 80x80 build/assets/img/icons/apple-touch-icon-80x80-precomposed.png',
                'convert build/assets/img/icons/apple-touch-icon-152x152-precomposed.png -resize 96x96 build/assets/img/icons/apple-touch-icon-96x96-precomposed.png',
                'convert build/assets/img/icons/apple-touch-icon-152x152-precomposed.png -resize 72x72 build/assets/img/icons/apple-touch-icon-72x72-precomposed.png',
                'convert build/assets/img/icons/apple-touch-icon-152x152-precomposed.png -resize 48x48 build/assets/img/icons/apple-touch-icon-48x48-precomposed.png',
                'convert build/assets/img/icons/apple-touch-icon-152x152-precomposed.png -resize 36x36 build/assets/img/icons/apple-touch-icon-36x36-precomposed.png',
            ].join('&&'),
        options: {
          stdout: true
        }
      },
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
    preprocess : {
      options: {
        context : {
          NAME: '<%= pkg.name %>',
          AUTHOR: '<%= pkg.author %>',
          VERSION: '<%= pkg.version %>',
          CACHEBUSTER: '<%= grunt.template.today("mdhMs") %>',
          DESCRIPTION: '<%= pkg.description %>',
          OG_IMG: 'assets/img/og_image.png',
          HOMEPAGE: '<%= pkg.homepage %>',
          GIT: '<%= pkg.repository.url %>',
          BUGS: '<%= pkg.bugs.url %>',
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
          'src/vendor/jquery/dist/jquery.js',
          'src/vendor/fastclick/lib/fastclick.js',
          'src/vendor/angular/angular.js',
          'src/vendor/angular-animate/angular-animate.js',
          'src/vendor/angular-resource/angular-resource.js',
          'src/vendor/angular-route/angular-route.js',
          'src/vendor/angular-sanitize/angular-sanitize.js',
          'src/vendor/angular-touch/angular-touch.js',
          'src/vendor/angular-cookies/angular-cookies.js',
          'src/vendor/bootstrap/js/button.js',
          'src/vendor/bootstrap/js/dropdown.js',
          //'src/vendor/speech-synthesis/src/polyfill.js',
          'src/js/*',
          'src/js/controllers/*'
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
    fontello: {
      dist: {
        options: {
            config  : 'src/fontello-config.json',
            zip     : 'src/vendor/',
            fonts   : 'build/assets/font',
            styles  : 'src/vendor/fontello-css/',
            scss    : false,
            force   : true
        }
      }
    },
    copy: {
      main: {
        files: [
            {
                src: 'README.md',
                dest: 'build/docs/README.md'
            },
            {
                src: 'LICENSE',
                dest: 'build/docs/LICENSE'
            },
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
        "phonegap",
        "src/libs",
        "src/vendor",
        "src/locale",
        "src/locale-json",
        "src/js/locales.js",
        "src/js/locales-structure.js",
        "src/views/_icons.html"
      ]
    },

    phonegap: {
      config: {
        root: 'build',
        config: {
          template: 'src/_config.xml',
          data: {
            id: 'com.hitchwiki.phrasebook',
            version: '<%= pkg.version %>',
            name: '<%= pkg.name %>'
          }
        },
        cordova: 'src/.cordova',
        path: 'phonegap',
        plugins: [
            //'/local/path/to/plugin',
            //'http://example.com/path/to/plugin.git'
        ],
        platforms: ['android', 'ios'],
        maxBuffer: 200, // You may need to raise this for iOS.
        verbose: true,
        releases: 'releases',
        releaseName: function(){
          var pkg = grunt.file.readJSON('package.json');
          return(pkg.name + '-' + pkg.version);
        },

        // Must be set for ios to work.
        // Should return the app name.
        name: function(){
          var pkg = grunt.file.readJSON('package.json');
          return pkg.name;
        },

        // Add a key if you plan to use the `release:android` task
        // See http://developer.android.com/tools/publishing/app-signing.html
        /*
        key: {
          store: 'release.keystore',
          alias: 'release',
          aliasPassword: function(){
            // Prompt, read an environment variable, or just embed as a string literal
            return('');
          },
          storePassword: function(){
            // Prompt, read an environment variable, or just embed as a string literal
            return('');
          }
        },
        */

        // Set an app icon at various sizes (optional)
        icons: {
          android: {
            ldpi:  'build/assets/img/icons/icon-36-ldpi.png',
            mdpi:  'build/assets/img/icons/icon-48-mdpi.png',
            hdpi:  'build/assets/img/icons/icon-72-hdpi.png',
            xhdpi: 'build/assets/img/icons/icon-96-xhdpi.png'
          },
        //  wp8: {
        //    app: 'build/assets/img/icons/icon-62-tile.png',
        //    tile: 'build/assets/img/icons/icon-173-tile.png'
        //  },
          ios: {
            icon29:     'build/assets/img/icons/apple-touch-icon-29x29-precomposed.png',
            icon29x2:   'build/assets/img/icons/apple-touch-icon-58x58-precomposed.png',
            icon40:     'build/assets/img/icons/apple-touch-icon-40x40-precomposed.png',
            icon40x2:   'build/assets/img/icons/apple-touch-icon-80x80-precomposed.png',
            icon57:     'build/assets/img/icons/apple-touch-icon-precomposed.png',
            icon57x2:   'build/assets/img/icons/apple-touch-icon-114x114-precomposed.png',
            icon60x2:   'build/assets/img/icons/apple-touch-icon-120x120-precomposed.png',
            icon72:     'build/assets/img/icons/apple-touch-icon-72x72-precomposed.png',
            icon72x2:   'build/assets/img/icons/apple-touch-icon-144x144-precomposed.png',
            icon76:     'build/assets/img/icons/apple-touch-icon-76x76-precomposed.png',
            icon76x2:   'build/assets/img/icons/apple-touch-icon-152x152-precomposed.png'
          }
        },

        // Set a splash screen at various sizes (optional)
        // Only works for Android and IOS
        /*
        screens: {
          android: {
            ldpi: 'screen-ldpi-portrait.png'
            // landscape version
            ldpiLand: 'screen-ldpi-landscape.png'
            mdpi: 'screen-mdpi-portrait.png'
            // landscape version
            mdpiLand: 'screen-mdpi-landscape.png'
            hdpi: 'screen-hdpi-portrait.png'
            // landscape version
            hdpiLand: 'screen-hdpi-landscape.png'
            xhdpi: 'screen-xhdpi-portrait.png'
            // landscape version
            xhdpiLand: 'www/screen-xhdpi-landscape.png'
          },
          ios: {
            // ipad landscape
            ipadLand: 'screen-ipad-landscape.png',
            ipadLandx2: 'screen-ipad-landscape-2x.png',
            // ipad portrait
            ipadPortrait: 'screen-ipad-portrait.png',
            ipadPortraitx2: 'screen-ipad-portrait-2x.png',
            // iphone portrait
            iphonePortrait: 'screen-iphone-portrait.png',
            iphonePortraitx2: 'screen-iphone-portrait-2x.png',
            iphone568hx2: 'screen-iphone-568h-2x.png'
          }
        },
        */

        // Android-only integer version to increase with each release.
        // See http://developer.android.com/tools/publishing/versioning.html
        versionCode: function(){ return(1) },

        // If you want to use the Phonegap Build service to build one or more
        // of the platforms specified above, include these options.
        // See https://build.phonegap.com/
        //remote: {
        //  username: 'your_username',
        //  password: 'your_password',
        //  platforms: ['android', 'blackberry', 'ios', 'symbian', 'webos', 'wp7']
        //}
      }
    }


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
  grunt.loadNpmTasks('grunt-phonegap');
  grunt.loadNpmTasks('grunt-fontello');
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
                       'fontello',
                       'favicons',
                       'shell',
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
