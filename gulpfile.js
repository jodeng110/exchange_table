var gulp = require('gulp');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var ugilfy = require('gulp-uglify');

var PATHS = {
  server: 'server/server.js',
  client: {
    index: 'client/index.html',
    assets: 'client/assets/**/*',
    js_file: 'client/app/**/*.js',
    scss_file: 'client/app/**/*.scss',
    css: 'client/css',
    css_file: 'client/css/**/*.css'
  },
  dest: 'public',
  minifyjs: 'build.min.js',
  minifycss: 'style.min.css'
};

gulp.task('default', ['build']);

gulp.task('build', ['scripts', 'scss', 'css-minify', 'copy']);

gulp.task('scripts', ['js-minify']);

gulp.task('develop', ['build', 'serve', 'watch']);


// remove all file and folders in 'public' directory
gulp.task('clean', function(){
  gulp.src(PATHS.dest, {read: false})
    .pipe(clean());
});

gulp.task('js-minify', function(){
  gulp.src(PATHS.client.js_file)
    .pipe(ugilfy({mangle: false}))
    .pipe(rename(PATHS.minifyjs))
    .pipe(gulp.dest(PATHS.dest+'/scripts'));
});

gulp.task('scss', function(){
  console.log('.scss파일을 css로 컴파일 합니다.');
  gulp.src(PATHS.client.scss_file)
    .pipe(sass())
    .pipe(gulp.dest(PATHS.client.css));
});

gulp.task('css-minify', function(){
  console.log('css파일을 최소화 합니다.');
  gulp.src(PATHS.client.css_file)
    .pipe(cssmin())
    .pipe(rename(PATHS.minifycss))
    .pipe(gulp.dest(PATHS.dest+'/styles'));
});

gulp.task('copy', function(){
  console.log('html파일을 /public 복사합니다.');
  gulp.src(PATHS.client.index)
    .pipe(htmlreplace({
      'css': 'styles/'+PATHS.minifycss,
      'js': 'scripts/'+PATHS.minifyjs
    }))
    .pipe(gulp.dest(PATHS.dest));
  gulp.src(PATHS.client.assets)
    .pipe(gulp.dest(PATHS.dest+'/assets'));
});

gulp.task('serve', ['build'], function(){
  return nodemon({
    script: PATHS.server, options: '-i client/**/*'
  });
})

gulp.task('watch', function(){
  gulp.watch(PATHS.client.js_file, ['js-minify']);
  gulp.watch(PATHS.client.scss_file, ['scss']);
  gulp.watch(PATHS.client.css_file, ['css-minify']);
});