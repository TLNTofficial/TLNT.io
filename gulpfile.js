const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const merge = require("gulp-merge");
const minifycss = require("gulp-minify-css");
const minifyjs = require("gulp-minify");
const watch = require('gulp-watch');

const cssfiles = ["assets/css/bootstrap.css"];
const sassfiles = ["css/master.sass"];
const jsfiles = ["assets/js/*.js", "assets/js/main.js"];

gulp.task('build:css', function() {
    const files = gulp.src(cssfiles);
    const scss = gulp.src(sassfiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));

    return merge(files,scss)
            .pipe(concat('styles-min.css'))
            .pipe(gulp.dest('dist'))
            .pipe(minifycss())
            .pipe(gulp.dest('dist'));
});


gulp.task('build:js', function() {
    gulp.src(jsfiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest("dist"))
        .pipe(minifyjs())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ["build:css", "build:js"]);

gulp.task('watch', ["build"], function() {
    gulp.watch(cssfiles.concat(sassfiles), ['build:css']);
    gulp.watch(jsfiles, ['build:js']);
});