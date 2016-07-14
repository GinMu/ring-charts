var gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    htmlhint = require("gulp-htmlhint"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    livereload = require("gulp-livereload"),
    concat = require('gulp-concat'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    cssmin = require('gulp-clean-css'),
    config = require("./config.json");

gulp.task("jshint", function() {
    gulp.src(config.js_src)
        .pipe(jshint({
            "node": true,
            "nonstandard": true
        }))
        .pipe(jshint.reporter());
});

gulp.task("htmlhint", function() {
    gulp.src(config.html_src)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});

gulp.task("minify-js", function() {
    gulp.src(config.js_src)
        .pipe(uglify({
            mangle: {
                except: ['require', 'exports', 'module']
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.js_dest))
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/js/'));
});

gulp.task("livereload", function() {
    livereload.listen();
    gulp.src(config.html_src)
        .pipe(htmlhint())
        .pipe(livereload())
        .pipe(htmlhint.reporter());
});

gulp.task("mincss", function() {
    gulp.src(config.css_src)
        .pipe(cssmin({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            // compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.css_dest))
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css/'));
});

gulp.task('rev-css', function() {
    gulp.src(['./rev/css/*.json', 'index.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector()) //- 执行文件内css名的替换
        .pipe(gulp.dest('./product/')); //- 替换后的文件输出的目录
});

gulp.task('rev-js', function() {
    gulp.src(['./rev/js/*.json', 'index.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector()) //- 执行文件内css名的替换
        .pipe(gulp.dest('./product/'));
});

gulp.watch(config.jshint_src, ["jshint"]);
gulp.watch(config.htmlhint_src, ["htmlhint"]);
gulp.watch(config.livereload_src, ["livereload"]);
//gulp.watch(config.js_src, ["minify-js"]);
gulp.task("default", ["jshint", "htmlhint", "livereload"]);
