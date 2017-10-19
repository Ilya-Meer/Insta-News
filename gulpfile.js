var gulp = require('gulp');

var uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano')
    prettyError = require('gulp-prettyerror');
    
    gulp.task('sass', function() {
      gulp.src('./sass/style.scss')
         .pipe(prettyError()) //error handling
         .pipe(sass())
         .pipe(autoprefixer({
            browsers: ['last 2 versions']
         }))
         .pipe(gulp.dest('./build/css'))
         .pipe(cssnano())
         .pipe(rename('style.min.css'))
         .pipe(gulp.dest('./build/css'));
   });

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
  gulp.watch('sass/*.scss', ['sass']);
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

















// gulp.task('sass', function() {
// gulp.src('./sass/style.scss')
//   .pipe(sass())
//   .pipe(autoprefixer({
//      browsers: ['last 2 versions']
//   }))
//   .pipe(gulp.dest('./build/css'))
//   .pipe(cssnano())
//   .pipe(rename('style.min.css'))
//   .pipe(gulp.dest('./build/css'));
// });






