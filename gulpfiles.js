(function (r) {
    "use strict";
    var scss = r("gulp-scss");
    var gulp = r("gulp");
    gulp.task("scss", function () {
        gulp.src(
            "home/scss/**/*.scss"
        ).pipe(scss(
            {"bundleExec": true}
        )).pipe(gulp.dest("home/static/css"));
    });
}(require));