/**
 * Created by rajan.lamichhane on 06/05/2016.
 */

var fs          = require( 'fs' ),
    browserify  = require( 'browserify' ),
    babelify    = require( 'babelify' ),
    sourcemaps  = require( 'gulp-sourcemaps' );

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var babel = require("gulp-babel");
var concat = require("gulp-concat");
//var browserify = require("gulp-browserify");

var buffer      = require( 'vinyl-buffer' );
var lrload      = require( 'livereactload' );

var uglify      = require( 'gulp-uglify' );

var util        = require( 'gulp-util' );
var source      = require( 'vinyl-source-stream' );

var notify      = require( 'gulp-notify' );

gulp.task('start', function () {
    nodemon({
        execMap: {
            js: 'node --debug'
        },
        script: './bin/www',
        ext: 'html js jsx',
        env: { 'NODE_ENV': 'development' }
    })
    .on('restart', function () {
        console.log('restarted!')
    })
})

gulp.task("build", function() {
    return gulp.src("./routes/main.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            "presets": ["react", "es2015"]
        }))
        .pipe(concat("main.js"))
        .pipe(browserify(
            {
                extensions : [ '.jsx' ],
                debug: true
            }
        ))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./public/js"));
});


browserifyConfig = {
    entries : './routes/main.js',
    extensions : [ '.jsx' ],
    transform : [["babelify", {
        "presets": ["es2015", "react"],
        "env": {
            "development": {
                "plugins": [
                    ["react-transform", {
                        "transforms": [{
                            "transform": "livereactload/babel-transform",
                            "imports": ["react"]
                        }]
                    }]
                ]
            }
        }
    }]], // We want to convert JSX to normal javascript
    debug : true, // Gives us sourcemapping
    cache : {},
    packageCache : {},
    plugin: [lrload]
};

gulp.task('browserify', function() {
    browserifyConfig.plugin = [];
    browserify( browserifyConfig ).bundle() // Create the initial bundle when starting the task
        .on('error', function(err) {
            return notify().write( err );
        })
        .pipe( source('main.js') )
        .pipe( buffer() )
        //.pipe( uglify() )
        .on( 'error', util.log )
        .pipe(sourcemaps.write("."))
        .pipe( gulp.dest('./public/js') );
});

gulp.task('watch', function () {
    gulp.watch('./*/*.js*', ['start', 'browserify']);
});


gulp.task('default', ['watch']);