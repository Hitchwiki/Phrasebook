module.exports = function(grunt) {

  // HTML templates
  var templates = {
    'build/index.html':                'src/views/index.html',
    'build/partials/about.html':       'src/views/partials/about.html',
    'build/partials/list.html':        'src/views/partials/list.html',
    'build/partials/translate.html':   'src/views/partials/translate.html',
    'build/partials/pictograms.html':  'src/views/partials/pictograms.html',
    'build/docs/index.html':           'src/docs/index.html',
  };

  var clientJSData = [
    'src/js/locales-default-ui.js',
    'src/js/locales.js',
  ];
  var clientJS = [
    'src/js/app.js',
    'src/js/configs.js',
    'src/js/controllers/about.js',
    'src/js/controllers/list.js',
    'src/js/controllers/main.js',
    'src/js/controllers/pictograms.js',
    'src/js/controllers/translate.js'
  ];

  var clientJSLib = [
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
    'src/vendor/bootstrap/js/dropdown.js'
  ];


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    templates: templates,
    watch: {
      main: {
        files: [
          'gruntfile.js'
        ],
        tasks: [
          'copy',
          'preprocess:dev',
          'less:dev',
          'concat',
        ]
      },
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
        files: clientJS,
        tasks: [
          'jshint',
          'ngAnnotate',
          'concat'
        ]
      },
      locales: {
        files: [
          'src/locale-json/*'
        ],
        tasks: [
          'copy:locales'
        ]
      },
      fetchlocales: {
        files: [
          'scripts/fetch-translations.py'
        ],
        tasks: [
          'shell:fetchtranslations'
        ]
      },
      views: {
        files: [
          'src/views/*',
          'src/views/partials/*',
          'src/docs/index.html'
        ],
        tasks: [
          'preprocess:dev'
        ]
      },
      images: {
        files: [
          'src/img/*'
        ],
        tasks: [
          'copy:images'
        ]
      },
      pdfprint: {
        files: [
          'src/print/*'
        ],
        tasks: [
          'copy:pdfprint'
        ]
      },
      pdfprintlocales: {
        files: [
          'src/locale/*',
          'src/structure.json',
          'src/languages.json'
        ],
        tasks: [
          'copy:pdfprintlocales'
        ]
      }
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
        command: 'python ./scripts/fetch-translations.py',
        options: {
          stdout: true
        }
      },
      bowerinstall: {
        command: 'bower install'
      },
      gitclone: {
        command: 'git clone https://github.com/lipis/flag-icon-css.git src/libs/flags/'
      },
      pdfprint: {
        command: [
                'git clone --depth=1 http://git.code.sf.net/p/tcpdf/code build/print/tcpdf/',
                'rm -fR build/print/tcpdf/.git',
                'rm -fR build/print/tcpdf/examples'
            ].join('&&')
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
    jshint: {
      all: ['Gruntfile.js'].concat(clientJS)
    },
    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      build: {
        files: {
          'build/assets/js/annotated.js': clientJS
        }
      }
    },
    concat: {
      options: {
        banner: 'var phrasebookVer="<%= pkg.version %>",phrasebookDay="<%= grunt.template.today("yyyy-mm-dd") %>";\n'
      },
      dist : {
        src: [
          clientJSLib
            .concat(clientJSData)
            .concat(['build/assets/js/annotated.js'])
        ],
        dest: 'build/assets/js/app.js'
      }
    },
    uglify: {
      options: {
        mangle: true,
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
      images: {
        files: [
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: 'src/img/*',
            dest: 'build/assets/img'
          }
        ]
      },
      locales: {
        files: [
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: 'src/locale-json/*',
            dest: 'build/assets/locale/'
          }
        ]
      },
      pdfprint: {
          files: [
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'src/print/*',
                dest: 'build/print/'
            }
          ]
      },
      pdfprintlocales: {
        files: [
          {
            expand: true,
            //flatten: true,
            cwd: 'src/locale-json/',
            src: '**',
            dest: 'build/print/locale'
          },
          {
            src: 'src/structure.json',
            dest: 'build/print/structure.json'
          },
          {
            src: 'src/languages.json',
            dest: 'build/print/languages.json'
          }
        ]
      },
      other: {
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
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: 'src/libs/flags/flags/1x1/*',
            dest: 'build/assets/img/flags/'
          }
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
        "src/js/locales-default-ui.js",
        "src/views/_icons.html"
      ]
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'build',
          index: 'index.html'
        }
      }
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
        maxBuffer: 400, // You may need to raise this for iOS. (Did, it was 200)
        verbose: false,
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
        versionCode: function(){ return(1); },

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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ng-annotate');
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
                       'jshint',
                       'ngAnnotate',
                       'concat',
                       'uglify'
                     ]);

  grunt.registerTask('dev', [
                       'preprocess:dev',
                       'less:dev',
                       'jshint',
                       'ngAnnotate',
                       'concat',
                       'connect',
                       'watch'
                     ]);

  grunt.registerTask('dev-print', [
                       'copy:pdfprint',
                       'copy:pdfprintlocales',
                       'watch:pdfprint',
                       'watch:pdfprintlocales'
                     ]);

  grunt.registerTask('build', [
                       'fontello',
                       'favicons',
                       'shell',
                       'preprocess:prod',
                       'less:prod',
                       'jshint',
                       'ngAnnotate',
                       'concat',
                       'uglify',
                       'copy'
                       //'manifest'
                     ]);

    // Default task
    grunt.registerTask('default', 'build');

};
