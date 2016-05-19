var gulp = require("gulp");
var plumber = require("gulp-plumber");

// ------------
// server
// ------------
var browser = require("browser-sync");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./dst/"
        }
    });
});

// ------------
// sass
// ------------
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function() {
    gulp.src("src/sass/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./dst/css"))
        .pipe(browser.reload({stream: true}));
});

// ------------
// js
// ------------
var uglify = require("gulp-uglify");

gulp.task("js", function() {
    gulp.src("src/js/**/*.js")
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./dst/js/min"))
        .pipe(browser.reload({stream: true}));
});

// ------------
// default
// ------------
gulp.task("default", ["server", "js", "sass"], function() {
    gulp.watch(["src/js/**/*.js", "!dst/js/min/**/*.js"], ["js"]);
    gulp.watch("src/sass/**/*.scss", ["sass"]);
})