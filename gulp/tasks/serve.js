
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../gulp-config');
var browserSync = require('browser-sync').create();


var port = process.env.PORT || config.defaultPort;


gulp.task('serve:dev', ['load-models', 'sass'], function () {
    var isDev = true;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'Development' : 'Production'
        },
        watch: [config.server]
    };

    return nodemon(nodeOptions)
        .on('restart', function (ev) {
            console.log('*** NODEMON STARTED ***')
            console.log('files changed on restart: \n' + ev);
            setTimeout(function () {
                browserSync.notify('Zubair');
                browserSync.reload({ stream: false });
            }, 1000);
        })
        .on('start', function () {
            startBrowserSync();
        })
        .on('crash', function () { })
        .on('exit', function () { });

});

function startBrowserSync() {
    if (browserSync.active) {
        return;
    }

    gulp.watch("./src/client/web/assets/scss/**/*.scss", ['sass']);
    gulp.watch("./src/client/web/**/*.html").on('change', browserSync.reload);

    var options = {
        proxy: 'localhost:' + port,
        port: 5000,
        browser: 'chrome',
        files: [
            config.server + '**/*.js',
            config.client + '**/*.js',
            config.client + '**/*.css',
            config.client + '**/*.html',
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        // logLevel: 'debug',
        logPrefix: 'Browser-Sync',
        notify: true,
        reloadDelay: 1000

    };


    browserSync.init(options);
}









// function serve(isDev) {

//     var nodeOptions = {
//         script: config.nodeServer,
//         env: {
//             'PORT': port,
//             'NODE_ENV': isDev ? 'Development' : 'Production'
//         },
//         watch: [config.server],
//         ignore: ['./node_modules/**']

//     };

//     return nodemon(nodeOptions)
//         .on('restart', function () {
//             setTimeout(function () {
//                 browserSync.reload({stream: false});
//             }, config.browserReloadDelay)
//             console.log('restarting');
//         })
//         .on('start', function () {
//             console.log('*** Nodemon Started ***', nodeOptions.env.PORT);
//             startBrowserSync(isDev);
//         });

// };



// function startBrowserSync(isDev) {
//     // if (args.nosync || browserSync.active) {
//     //     return;
//     // }
    
//     //  browserSync.use(spa({
//     //     selector: '[app]'
//     // }));
    
//     if (browserSync.active) {
//         return;
//     }

//     console.log('Starting Browser Sync on port ' + port);
    
    
//     // if (isDev) {
//     //     gulp.watch("./src/client/web/assets/scss/**/*.scss", ['sass']);
//     //     gulp.watch("./src/client/web/**/*.html").on('change', browserSync.reload);

//     // } else {
//     //     // gulp.watch([config.less, config.client + '**/*.less', config.js, config.html], ['optimize', browserSync.reload]);
//     //     gulp.watch("./src/client/web/assets/scss/**/*.scss", ['sass']);
//     //     gulp.watch("./src/client/web/**/*.html").on('change', browserSync.reload);

//     // }



//     var options = {
//         proxy: 'localhost:' + port,
//         port: 5000,
//         files: [
//             config.server + '**/*.js',
//             config.client + '**/*.js',
//             config.client + '**/*.html',
//         ],
//         ghostMode: {
//             clicks: true,
//             location: false,
//             forms: true,
//             scroll: true
//         },
//         injectChanges: true,
//         logFileChanges: true,
//         logLevel: 'debug',
//         logPrefix: 'gulp-patterns',
//         notify: true,
//         reloadDelay: 1000

//     };

//     browserSync(options);



// }
