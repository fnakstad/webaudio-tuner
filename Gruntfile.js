module.exports = function(grunt) {
    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        less: lessConfig,

        watch: {
            scripts: {
                files: ['client/css/*.less'],
                tasks: ['less:development']
            }
        }
    });

    // Register custom tasks
    grunt.registerTask('nodemon', function() {
        var nodemon = grunt.util.spawn({
            cmd: 'nodemon',
            args: ['server.js']
        });
        nodemon.stdout.pipe(process.stdout);
        nodemon.stderr.pipe(process.stderr);
    });

    grunt.registerTask('dev', ['nodemon', 'watch']);
};

var lessConfig = {
    development: {
        options: {
            paths: ["client/css"]
        },
        files: {
            "client/css/app.css": "client/css/app.less"
        }
    },
    production: {
        options: {
            paths: ["client/css"],
            yuicompress: true
        },
        files: {
            "client/css/app.css": "client/css/app.less"
        }
    }
};