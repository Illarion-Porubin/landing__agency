const {src, dest, watch, parallel, series }  = require('gulp');

const scss         = require('gulp-sass');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoPrefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');



//запуск браузера
function browsersync() {
  browserSync.init({
    server : {
      baseDir: "app/"
    }
  });
}


// чистим dist
function cleanDist(){
  return del ('dist')
}


// следим за images
function images(){
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
  ]))
    .pipe(dest('dist/images'))
}


// CSS библиотеки
function styles() {
  return src([
     'app/scss/style.scss',
     'node_modules/normalize.css/normalize.css',
     'node_modules/slick-carousel/slick/slick.css',
    ])
     .pipe(scss({outputStyle: 'compressed'}))
     .pipe(concat("style.min.css"))
     .pipe(autoPrefixer({
       overrideBrowserslist: ['last 10 version'],
       grid: true
     }))
     .pipe(dest('app/css'))
     .pipe(browserSync.stream())
     //.pipe(scss({outputStyle: 'expanded'})) красиво переносит строку//
     //.pipe(scss({outputStyle: 'compressed'})) минифицируем файил //
}



// JS библиотеки
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'app/js/main.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}


// создаём конечный билд проекта
function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html',
  ], {base: 'app'})
    .pipe(dest('dist'))
}


// следим за процессами
function watching(){
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload)
}



// реестр const
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watching = watching;
exports.browsersync = browsersync;
exports.cleanDist = cleanDist;



exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);