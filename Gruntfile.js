module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: [
        'src/js/<%= pkg.name %>.src.js',
        'src/less/<%= pkg.name %>.less',
        'src/js/locales.js',
        'GruntFile.js'
      ],
      tasks: ['less', 'concat', 'uglify']
    },
    shell: {
      fetchtranslations: {
        command: 'python fetch-translations.py',
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
    less: {
      development: {
        options: {
          paths: ["www/assets/css"]
        },
        files: {
          "www/assets/css/<%= pkg.name %>.css": "src/less/<%= pkg.name %>.less"
        }
      },
      production: {
        options: {
          paths: ["www/assets/css"],
          cleancss: true
        },
        files: {
          "www/assets/css/<%= pkg.name %>.min.css": "src/less/<%= pkg.name %>.less"
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
          'src/vendor/bootstrap/js/dropdown.js',
          'src/js/locales.js',
          'src/js/<%= pkg.name %>.src.js'
          ],
        dest: 'www/assets/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false, // Angular doesn't like mangling...
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'www/assets/js/<%= pkg.name %>.js',
        dest: 'www/assets/js/<%= pkg.name %>.min.js'
      }
    },
    copy: {
      main: {
        files: [
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'src/vendor/font-awesome/fonts/*',
                dest: 'www/assets/fonts/',
            },
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: 'src/libs/iso-country-flags-svg-collection/svg/country-squared/*',
                dest: 'www/assets/img/flags/',
            }/*,
            {
                src: 'src/libs/iso-country-flags-svg-collection/iso-3166-1.json',
                dest: 'www/assets/locale/iso-3166-1.json',
            }*/

        ]
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', [
                       'shell',
                       'less',
                       'concat',
                       'uglify',
                       'copy'
                     ]);
};