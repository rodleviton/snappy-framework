var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

gulp.task('css', function() {
    return gulp.src('public/assets/sass/app.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('public'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public'))
        .pipe(livereload())
        .pipe(notify({ title: 'Snappy' , message: 'CSS compiled successfully!' }));
});

gulp.task('default', function() {
    gulp.run('css');

    gulp.watch('public/**/*.scss', function() {
        gulp.run('css');
    });
});