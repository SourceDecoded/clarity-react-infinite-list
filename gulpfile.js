var gulp = require("gulp");
var exec = require("child_process").exec;
var jsdoc = require("gulp-jsdoc3");

gulp.task("jsdoc", ["webpack"], function (callback) {
    gulp.src(["./README.md", "./library/**/*.js"], { read: false }).pipe(jsdoc(callback));
});

gulp.task("default", ["jsdoc"]);