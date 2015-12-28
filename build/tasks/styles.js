var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();




 
gulp.task('sass', function () {
  return gulp.src('./src/client/web/assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/client/web/assets/scss/'))
    .pipe(browserSync.stream());    
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/client/web/assets/scss/**/*.scss', ['sass']);
});
