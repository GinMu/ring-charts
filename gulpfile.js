var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	htmlhint = require("gulp-htmlhint"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	livereload = require("gulp-livereload"),
	config = require("./config.json");

gulp.task("jshint", function() {
	gulp.src(config.jshint_src)
		.pipe(jshint({
			"node": true,
			"nonstandard": true
		}))
		.pipe(jshint.reporter());
});

gulp.task("htmlhint", function() {
	gulp.src(config.htmlhint_src)
		.pipe(htmlhint())
		.pipe(htmlhint.reporter());
});

gulp.task("minify-js", function() {
	gulp.src(config.uglify_src)
		.pipe(uglify({
			mangle: {
				except: ['require', 'exports', 'module']
			}
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(config.uglify_dest));
});

gulp.task("livereload", function() {
	livereload.listen();
	gulp.src(["index.html",'management.html'])
		.pipe(htmlhint())
		.pipe(livereload())
		.pipe(htmlhint.reporter());
});

gulp.watch(config.jshint_src, ["jshint"]);
gulp.watch(config.htmlhint_src, ["htmlhint"]);
gulp.watch(["*.html","js/ring-charts.js","css/ring-charts.css","js/ring-charts-event.js"], ["livereload"]);
//gulp.watch(config.uglify_src, ["minify-js"]);
gulp.task("default", ["jshint", "htmlhint", "livereload"]);
