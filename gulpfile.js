const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass
gulp.task('sass', () => {
    return gulp.src(["src/sass/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream());
});

// Watch & Serve
gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: './src'
    });

    gulp.watch(["src/sass/*.scss"], ['sass']);
    gulp.watch(['src/*.html']).on('change', browserSync.reload);
});

// Default
gulp.task('default', ['serve']);
