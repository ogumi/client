/*
 * Copyright (c) 2015 naymspace software (Dennis Nissen)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var gulp    = require('gulp');
var fs      = require('fs');
var request = require('request');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

module.exports = function(options) {

  gulp.task('war', ['build'], function () {
    return gulp.src(options.dist + '/**/*')
      .pipe($.war({
        welcome: 'index.html',
        displayName: 'Ogumi Web Client'
      }))
      .pipe($.zip('webclient.war'))
      .pipe(gulp.dest(options.deploy + '/war/'));
  });

  gulp.task('tomcat-deploy', ['war'], function () {
    var tomcat  = require('../tomcat.json');
    return fs.createReadStream(options.deploy + '/war/webclient.war')
    .pipe(request
      .put(tomcat.url)
      .auth(tomcat.user, tomcat.password));
  });
};