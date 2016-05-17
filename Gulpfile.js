/**
 * Created by rajan.lamichhane on 12/05/2016.
 */

var gulp = require('gulp');
var nightwatch  = require( 'gulp-nightwatch' );


gulp.task('e2e', function() {
    return gulp.src('')
        .pipe(nightwatch({
            configFile: 'nightwatch.json'
        }));
});

gulp.task('e2e:asm1', function() {
    return gulp.src('')
        .pipe(nightwatch({
            configFile: 'nightwatch-asm1.json'
        }));
});

