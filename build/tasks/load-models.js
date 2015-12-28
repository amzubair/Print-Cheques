var gulp = require('gulp');
var inject = require('gulp-inject')
var config = require('../gulp-config');


gulp.task('load-models', function () {

    return gulp
        .src(config.paths.models)
        .pipe(inject(gulp.src('**/*.model.js', { read: false, cwd: config.paths.api, addRootSlash: false}),{
            starttag: '// inject:models',
            endtag: '// endinject',
            transform: function (filepath) {
                return 'require(".' + filepath + '");';
            }
        }))
        .pipe(gulp.dest(config.paths.api));
});