module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
              separator: '\n\n//----------------------------------------------------------------------\n\n',
              banner: '\n\n//----------------------------------------------------------------------\n\n'
            },
            dist: {
                src: [
                    'src/components/angular/angular.js',
                    'src/components/moment/moment.js',
                    'src/js/main.js'
                ],
                dest: 'assets/js/application.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'assets/css/application.css': 'src/sass/main.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'assets/js/application.min.js': ['assets/js/application.js']
                }
            }
        },
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: ['src/components/custom/main.js'],
                tasks: ['concat', 'uglify']
            },
            scss: {
                files: ['src/sass/main.scss'],
                tasks: ['sass', 'cssmin']
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/components/font-awesome/fonts/**'],
                    dest: 'assets/fonts/',
                    filter: 'isFile'}
                ]
            }
        }

    }); //initConfig ::end

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'copy', 'watch']);

};