module.exports = function(grunt) {
    // load plugins
    [
        'grunt-mocha-test',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(function(task) {
        grunt.loadNpmTasks(task);
    });
    // configure plugins
    grunt.initConfig({
        mochaTest: {
            test: { 
                src: 'qa/tests-*.js',
                options: {
                    ui: 'tdd'
                },
            },
        },
        jshint: {
            app: ['pkc.js', 'public/js/**/*.js',
                'lib/**/*.js'
            ],
            qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
        },
        exec: {
            linkchecker: { cmd: 'linkchecker http://localhost:3000' }
        },
    });
    // register tasks
    grunt.registerTask('default', ['mochaTest', 'jshint', 'exec']);
};


