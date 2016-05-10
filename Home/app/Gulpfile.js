/**
 * Created by Rajan.Lamichhane on 12/01/2016.
 */

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    server = require('gulp-express'),
    jasmine = require('gulp-jasmine'),
    karmaServer = require('karma').Server,
    shell = require('gulp-shell');


gulp.task('lint', function () {
    gulp.src('./**/*.js')
        .pipe(jshint())
});

gulp.task('tddbackend', function() {
    return gulp.src(['spec/**/*.js', '!spec/public/**/*.js', '!public/javascripts/**/*.js'])
        .pipe(jasmine());
});

gulp.task('bdd', shell.task([
    'galen test ./spec/functional/gspec/main.test --htmlreport report'
]));

gulp.task('develop', function() {
    server.run(['bin/www']);
    gulp.watch(['bin/www'], server.notify);
});

gulp.task('watch', function() {
    gulp.watch([
        'Gulpfile.js',
        'app.js',
        'bin/www',
        '**/*.js',
        '**/*.jade'
    ], ['develop']);
});

gulp.task('testbackend', ['tddbackend'], function() {
    gulp.watch(['./**/*.js', '!spec/public/**/*.js', '!public/javascripts/**/*.js'], ['tddbackend']);
});

gulp.task('testfrontend', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('default', ['develop', 'watch']);