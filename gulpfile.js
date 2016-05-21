var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');

/* Gulp Default task loads all the functions i need */

gulp.task('default', ['sass', 'jade', 'js']);

/* Gulp task for keeping the browser in sync with my code */

gulp.task('sync', ['syncInit', 'sass', 'jade', 'js', 'watch']);

/* Gulp task for processing javascript */
gulp.task('js', function(){
  gulp.src('./dev/js/**/*.js')
      // TODO: Add Minifyin to the pipeline

      .pipe(gulp.dest('./app/js/'))
      .pipe( browserSync.stream());
});
/* Gulp task for compiling sass files */

gulp.task('sass', function(){
  gulp.src('./dev/sass/**/*.scss')
      .pipe( sass({ pretty: true }))
      .pipe( gulp.dest('./app/css/'))
      .pipe( browserSync.stream() );
});

/* Gulp task for compiling jade */
gulp.task('jade', function(){
  gulp.src('./dev/**/*.jade')
      .pipe( jade({ pretty: true }))
      .pipe( gulp.dest('./app/'))
      .pipe( browserSync.stream());
});

/* Gulp task for Initializing browser-sync */
gulp.task('syncInit', function(){
  browserSync.init({
    server: './app/',
    logFileChanges: false
  });
});

/* Gulp Watch Task */
gulp.task('watch', function(){
  gulp.watch('./dev/sass/**/*.scss', ['sass']);
  gulp.watch('./dev/**/*.jade', ['jade']);
  gulp.watch('./dev/js/**/*.js', ['js']);
});
