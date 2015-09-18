var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  del = require('del');

var LIB_FILES = ['node_modules/phaser/build/phaser.min.js'],
  HTML_FILES = ['src/**/*.html'],
  STYLE_FILES = ['src/levels/**/*.scss'],
  SCRIPT_FILES = ['src/scripts/**/*.js'],
  IMG_FILES = ['src/assets/images/**/*'],
  LEVEL_FILES = ['src/levels/**/*'];

var PUB_STYLES = 'public/css',
  PUB_SCRIPTS = 'public/js',
  PUB_IMG = 'public/assets/images';

gulp.task('libs', function() {
    gulp.src(LIB_FILES)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest(PUB_SCRIPTS))
      .pipe(connect.reload());
});

gulp.task('styles', function() {
  return $.sass(STYLE_FILES, {
      style: 'expanded'
    })
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(PUB_STYLES))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.minifycss())
    .pipe(gulp.dest(PUB_STYLES))
    .pipe($.notify({
      message: 'Styles complete'
    }));
});

gulp.task('scripts', function() {
  return gulp.src('SCRIPT_FILES')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('main.js'))
    .pipe(gulp.dest(PUB_SCRIPTS))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(PUB_SCRIPTS))
    .pipe($.notify({
      message: 'Scripts complete'
    }));
});

gulp.task('images', function() {
  return gulp.src('IMG_FILES')
    .pipe($.cache($.imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(PUB_IMG))
    .pipe($.notify({
      message: 'Images complete'
    }));
});

gulp.task('clean', function(cb) {
  del([PUB_STYLES , PUB_SCRIPTS, PUB_IMG], cb);
});

gulp.task('watch', function() {
  gulp.watch( STYLE_FILES, ['styles']);
  gulp.watch( SCRIPT_FILES, ['scripts']);
  gulp.watch( IMG_FILES, ['images']);
});

gulp.task('live', function() {
  $.connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('serve', ['watch', 'live']);
gulp.task('deploy', ['clean'], function() {
  gulp.start('styles', 'libs', 'scripts', 'images');
});
gulp.task('default', ['serve']);