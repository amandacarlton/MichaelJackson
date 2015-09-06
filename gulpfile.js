var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['html', 'scripts', 'css', 'watchout']);

gulp.task('html', function () {
  return gulp.src('index.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  return gulp.src('js/*js')
  .pipe(concat('all.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp.src('css/stylesheet.css')
  //.pipe(concat('all.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('watchout', function () {
  gulp.watch('js/*js', ['scripts']);
  gulp.watch('css/stylesheet.css', ['css']);
  gulp.watch('index.html', ['html']);
});
