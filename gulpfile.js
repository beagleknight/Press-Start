var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  del = require('del');

var LIB_FILES = ['node_modules/phaser/build/phaser.min.js'],
  HTML_FILES = ['src/**/*.html'],
  STYLE_FILES = ['src/styles/**/*.scss'],
  SCRIPT_FILES = ['src/scripts/**/*.ts'],
  ASSETS_FILES = ['src/assets/**/*'],
  LEVEL_FILES = ['src/levels/**/*'];

var PUB = 'public',
  PUB_STYLES = 'public/css',
  PUB_SCRIPTS = 'public/js',
  PUB_ASSETS = 'public/assets';


gulp.task('html', function () {
    gulp.src(HTML_FILES)
        .pipe(gulp.dest(PUB))
        .pipe($.connect.reload());
});

gulp.task('libs', function() {
    gulp.src(LIB_FILES)
      .pipe($.concat('libs.js'))
      .pipe(gulp.dest(PUB_SCRIPTS))
      .pipe($.connect.reload());
});

gulp.task('styles', function() {
  return $.rubySass(STYLE_FILES, {
      style: 'expanded'
    })
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(PUB_STYLES))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.minifyCss())
    .pipe(gulp.dest(PUB_STYLES))
    .pipe($.connect.reload());
});


gulp.task('scripts', function() {
    var tsResult = gulp.src(SCRIPT_FILES)
        .pipe($.typescript({
            noImplicitAny: true,
            out: 'main.js'
        }));
    return tsResult.js
        .pipe(gulp.dest(PUB_SCRIPTS))
        .pipe($.connect.reload());
});

gulp.task('assets', function() {
  return gulp.src(ASSETS_FILES)
    .pipe(gulp.dest(PUB_ASSETS))
    .pipe($.connect.reload());
});

gulp.task('clean', function(cb) {
  del([PUB, PUB_STYLES , PUB_SCRIPTS, PUB_ASSSETS], cb);
});

gulp.task('watch', function() {
  gulp.watch( STYLE_FILES, ['styles']);
  gulp.watch( SCRIPT_FILES, ['scripts']);
  gulp.watch( ASSETS_FILES, ['assets']);
  gulp.watch( HTML_FILES, ['html']);
});

gulp.task('live', function() {
  $.connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('serve', ['build','watch', 'live']);
gulp.task('build', ['html','styles', 'libs', 'scripts', 'assets']);
gulp.task('default', ['serve']);
