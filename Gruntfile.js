'use strict';
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the angular
    var angularConfig = {
        angular: 'angular',
        dist: 'public'
    };
    // Grunt configuration
    grunt.initConfig({
        // Project settings
        inspinia: angularConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 7555,
                hostname: 'localhost',
                livereload: 35729,
                https: true
            },
            server2: {
                proxies: [
                    {
                        context: '/uploads',
                        host: 'localhost',
                        port: 8000,
                        https: false
                    },
                    {
                        context: '/files',
                        host: 'localhost',
                        port: 8000,
                        https: false
                    },
                    {
                        context: '/auth',
                        host: 'localhost',
                        port: 8000,
                        https: false
                    },
                    {
                        context: '/images',
                        host: 'localhost',
                        port: 8000,
                        https: false
                    },
                    {
                        context: '/api',
                        host: 'localhost',
                        port: 8000,
                        https: false
                    },
                    {
                        context: '/oauth',
                        host: 'localhost',
                        port: 8000,
                        https: false
                    },
                    {
                        context: '/broadcasting',
                        host: 'localhost',
                        port: 8000,
                        https: false
                    },
                    {
                        context: '/audio',
                        host: 'localhost',
                        port: 8000,
                        https: false
                    }


                ]
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [proxySnippet,
                            lrSnippet,
                            connect.static('<%= inspinia.angular %>/.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(angularConfig.angular)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    port: 4000,
                    hostname: 'localhost',
                    open: true,
                    base: '<%= inspinia.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "angular/styles/style.css": "angular/less/style.less"
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['angular/less/**/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            js: {
                files: ['<%= inspinia.angular %>/scripts/**/*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= inspinia.angular %>/**/*.html',
                    '<%= inspinia.angular %>/.tmp/styles/{,*/}*.css',
                    '<%= inspinia.angular %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= inspinia.dist %>/.tmp',
                            '!<%= inspinia.dist %>/.git*',
                            '!<%= inspinia.dist %>/index.php',
                            '!<%= inspinia.dist %>/web.config',
                            '!<%= inspinia.dist %>/robots.txt',
                            '!<%= inspinia.dist %>/favicon.ico'
                        ]
                    }
                ]
            },
            server: '<%= inspinia.angular %>/.tmp'
        },
        // Copies remaining files to places other tasks can use

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= inspinia.angular %>',
                        dest: '<%= inspinia.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/**/*.*',
                            'languages/{,*/}*.*',
                            'styles/fonts/*.*',
                            'images/{,*/}*.*',
                            'styles/*.png',
                            'fonts/**/*.*',
                            // 'css/**/*.*',
                            'styles/**/*.*',
                            'styles/*.png'
                            // 'scripts/*.*',
                            // 'bootstrap/**/*.*',
                            // 'js/**/*.*',
                            // 'scripts/**/*.*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= inspinia.angular %>/styles',
                dest: '<%= inspinia.angular %>/.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= inspinia.dist %>/scripts/{,*/}*.js',
                    '<%= inspinia.dist %>/styles/{,*/}*.css',
                    '<%= inspinia.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= inspinia.dist %>',
                        src: ['*.html', 'views/**/*.html', 'views/**/*.htm'],
                        dest: '<%= inspinia.dist %>'
                    }
                ]
            }
        },
        useminPrepare: {
            html: ['angular/index.html'],
            options: {
                dest: 'public'
            }
        },
        usemin: {
            html: ['public/index.html', 'public/login.html']
        }

    });

    // Run live version of angular
    grunt.registerTask('live', [
        'clean:server',
        // 'copy:styles',
        'configureProxies:server2',
        'connect:livereload',
        'watch'
    ]);


    grunt.registerTask('watchfiles', ['watch']);

    // Run build version of angular
    grunt.registerTask('server', [
        'build',
        'connect:dist:keepalive'
    ]);

    // Build version for production
    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'usemin',
        'htmlmin'
    ]);


};
