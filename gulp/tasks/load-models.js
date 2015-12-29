var gulp = require('gulp');
var inject = require('gulp-inject')
var config = require('../gulp-config');


gulp.task('load-models', function () {

    return gulp
        .src(config.models)
        .pipe(inject(gulp.src('**/*.model.js', { read: false, cwd: config.api, addRootSlash: false}),{
            starttag: '// inject:models',
            endtag: '// endinject',
            transform: function (filepath) {
                return 'require(".' + filepath + '");';
            }
        }))
        .pipe(gulp.dest(config.api));
});