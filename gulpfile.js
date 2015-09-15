var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  del = require('del');

gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(notify({ message: 'Styles complete' }));
});

gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(notify({message: 'Scripts complete'}));
});

gulp.task('images' ,function(){
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/assets/img'))
    .pipe(notify({message: 'Images complete'}));
});

gulp.task('clean', function(cb) {
  del(['public/assets/css', 'public/assets/js', 'public/assets/img'], cb);
});

gulp.task('watch', function(){
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('srcscro[t**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
});

gulp.task('live', function(){
  connect.server({
    root: 'pblic',
    livereload:true
  });
});

gulp.task('serve', ['watch', 'live']);
gulp.task('deploy', ['clean'],  function(){
  gulp.start('styles','scripts','images');
});
gulp.task('default', ['serve']);
