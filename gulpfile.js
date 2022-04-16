const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const copy = require('gulp-copy');



function cleanDist() {
  return src('./dist', { read: false }).pipe(clean());
}

function copyHtml() {
  return src('./src/*.html').pipe(copy('./dist/', { prefix: 1 }));
}

function appJs() {
  return src('./src/*.js')

    .pipe(concat('app.js'))
    .pipe(dest('./dist'));
}

function appCss() {
  return src('./src/*.css')

    .pipe(concat('app.css'))
    .pipe(dest('./dist'));
}
function vendorCss() {
  return src('./src/modules/jquery-ui-1.13.1/jquery-ui.css')

    .pipe(concat('vendor.css'))
    .pipe(dest('./dist'));
}

function vendorJs() {
  return src([
    './node_modules/jquery/dist/jquery.js',
    './src/modules/jquery-ui-1.13.1/jquery-ui.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(dest('./dist'));
}

function watchFiles() {
  return watch(['./src/**/*.js'], { ignoreinitial: false }, () => appJs())
}

module.exports = {
  build: series(cleanDist,parallel(appJs,vendorJs, appCss, vendorCss, copyHtml)),
  serve: series(cleanDist,parallel(appJs,vendorJs, appCss, vendorCss, copyHtml), watchFiles)

}