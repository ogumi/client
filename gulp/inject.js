'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('inject', ['scripts', 'styles'], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/app/**/*.css',
      '!' + options.tmp + '/serve/app/vendor.css'
    ], { read: false });

    var injectScripts = gulp.src([
      '{'  + options.src + ',' + options.tmp + '/serve}/app/**/*.js',
      '!{' + options.src + ',' + options.tmp + '/serve}/app/**/*.spec.js',
      '!{' + options.src + ',' + options.tmp + '/serve}/app/**/*.mock.js'
    ])
    .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    return gulp.src(options.src + '/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(wiredep(_.extend({}, options.wiredep)))
      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
