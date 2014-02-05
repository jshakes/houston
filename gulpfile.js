var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var coffee = require("gulp-coffee");
var compass = require("gulp-compass");
var uglify = require('gulp-uglify');

// Concat & Compile coffee
gulp.task("coffee", function() {
  gulp.src("./coffee/**/*.coffee")
    .pipe(concat("app.coffee"))
    .pipe(coffee({bare: true}).on("error", gutil.log))
    .pipe(gulp.dest("./js/"))
});

// Concat & Compile Compass
gulp.task("compass", function() {
  gulp.src("./scss/**/*.scss")
    .pipe(compass({
      css: './css',
      sass: './scss',
      image: './img'
    }))
    .pipe(gulp.dest("./css/"));
});

// Vendors
gulp.task("vendors", function() {
  
  gulp.src([
      "./bower_components/modernizr/modernizr.js",
      "./bower_components/jquery/jquery.js",
      "./bower_components/underscore/underscore.js",
      "./bower_components/backbone/backbone.js",
      "./bower_components/backbone.marionette/lib/backbone.marionette.js"
    ])
    .pipe(concat("vendors.js"))
    .pipe(uglify({outSourceMaps: true}))
    .pipe(gulp.dest("./js/"));
});

// Default
gulp.task("default", ["vendors", "coffee", "compass"]);

// Watch Coffee Files
gulp.watch("./coffee/*.coffee", ["coffee"]);
// Watch SCSS Files
gulp.watch("./scss/*.scss", ["compass"]);
