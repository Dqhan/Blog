const webpack = require('webpack'),
    clean = require("gulp-clean"),
    gulp = require('gulp'),
    gutil = require("gulp-util"),
    Q = require('q'),
    runSequence = require('run-sequence'),
    path = require("path");

var build = "./wwwroot",
    buildPath = "./wwwroot/resources/",
    webpackConfig = require("./webpack.config"),
    copyList = require("./copyFileList.json");

gulp.task("clean", function () {
    return gulp.src(build).pipe(clean());
});

gulp.task("copy", function () {
    copyList.forEach(function (value, index, array) {
        console.info(path.resolve(value.srcPath, '**'));
        console.info(value.destPath);
        var basePath = "";
        if (value.copyBaseFolder) {
            basePath = value.srcPath.substr(0, value.srcPath.lastIndexOf('/'));
        } else {
            basePath = value.srcPath;
        }
        gulp.src([path.resolve(value.srcPath, '**')], { base: basePath })
            .pipe(gulp.dest(value.destPath));
    });
});

gulp.task('buildUI', function () {
    let deferred = Q.defer();
    var myConfig = Object.assign(webpackConfig, {
        mode: "development",
        devtool: "sourcemap",
    });
    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) {
            throw (err);
        }
        stats.hasErrors() && console.info(stats.toString({
            chunks: true,
            colors: true
        }));
        deferred.resolve();
    });
    return deferred.promise;
});

gulp.task("webpack:build", function (callback) {
    let deferred = Q.defer();
    // modify some webpack config options
    var myConfig = Object.assign(webpackConfig, {
        mode: "production",
        devtool: false,
    });
    myConfig.module.rules[0].use[1].options.minimize = true;
    myConfig.module.rules[1].use[2].options.minimize = true;
    myConfig.module.rules[1].use[3].options.minimize = true;
    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        deferred.resolve();
    });
    return deferred.promise;
});

gulp.task('build', function () {
    let deferred = Q.defer();
    runSequence('clean',
        'webpack:build',
        'copy',
        function () {
            deferred.resolve();
        });
    return deferred.promise;
});