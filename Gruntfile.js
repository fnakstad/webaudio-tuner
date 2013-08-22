module.exports = function(grunt) {
    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.initConfig({
        less: {
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
                }
            }
        }
    });
};