var gulp = require('gulp');

var uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint');

gulp.task('script', ['eslint'], function(){
gulp.src('./js/*.js') // What files do we want gulp to consume?
  .pipe(uglify()) // Call the uglify function on these files
  .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
  .pipe(gulp.dest('./build/js')) // Where do we put the result?
});

gulp.task('eslint', function() {
    return gulp.src(['./js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
 
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['script']);
});


gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
        baseDir: "./"
      }
    
  })
  gulp.watch(['*.html', 'build/css/*.css', 
  'build/js/*.js']).on('change', browserSync.reload);
});



// Modify our default task method by passing an array of task names
gulp.task('default', ['watch', 'browser-sync']);
