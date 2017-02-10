var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require("gulp-if"),
    clean = require('gulp-clean'),
    uglify = require("gulp-uglify"),
    minifyHtml = require("gulp-minify-html"),
    purifyCss = require('gulp-purifycss'),
    cleanCss = require("gulp-clean-css");

gulp.task('default', ['clean'], function () { //异步回调
    gulp.start('index', 'img', 'fonts');
});

gulp.task('clean', function () {
    return gulp.src('dest', {read: false}).pipe(clean());
});

gulp.task('index', function () {
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', purifyCss(['./index.html'])))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(minifyHtml())
        .pipe(gulp.dest('dest'));
});

gulp.task('img', function () {
    gulp.src('img/**/*')
        .pipe(gulp.dest('dest/img'));
});

gulp.task('fonts', function () {
    gulp.src('fonts/**/*')
        .pipe(gulp.dest('dest/fonts'));
});

gulp.task('css', function() {
    return gulp.src('css/*.css')
        .pipe(purifyCss(['./index.html']))
        .pipe(gulp.dest('dest'));
});