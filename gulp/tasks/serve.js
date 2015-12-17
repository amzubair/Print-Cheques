
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../gulp-config');

var port = process.env.PORT || config.defaultPort;


gulp.task('serve', function(){
    serve(true);
})

function serve(isDev) {
    
    var nodeOptions = {
        script: config.nodeServer,
        ext: 'js',
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'Development' : 'Production'
        },
        watch: [config.server],
        ignore: ['./node_modules/**']

    };

    return nodemon(nodeOptions)
        .on('restart', function(){
            console.log('restarting');
        });

};