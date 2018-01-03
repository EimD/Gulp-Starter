const gulp = require('gulp'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');


const paths = {
    cleanPath: ['./wwwroot/css/*', './wwwroot/html/*'],
    sassPath: ['src/sass/*.scss']
}

// Clean wwwroot css and html folders
// Make by folders
// gulp.task('clean', () => {
//     return gulp.src(paths.cleanPath, {read: false})
//     .pipe(clean());
//    });


// Compile Sass
gulp.task('sass', () => {
    return gulp.src(["src/sass/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./wwwroot/css"))
        .pipe(browserSync.stream());
});

// // Copy Index
// gulp.task('copyIndex', () => {
//     return gulp.src("./src/index.html")
//         .pipe(gulp.dest("./wwwroot/"));
// });

// Copy HTML
gulp.task('copyHtml', () => {
    return gulp.src("./src/html/**")
        .pipe(gulp.dest("./wwwroot/"));
});

// Watch & Serve
gulp.task('serve', ['sass','copyHtml'], () => {
    browserSync.init({
        server: './wwwroot'
    });

    gulp.watch(["src/sass/*.scss"], ['sass']);
    gulp.watch("./src/html/**", ['copyHtml']);
    gulp.watch(['./wwwroot/**/*.html']).on('change', browserSync.reload);
});

// Default
gulp.task('default', ['serve']);
