var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyHtml = require("gulp-minify-html");
var ngHtml2Js = require("gulp-ng-html2js");
var uglify = require("gulp-uglify");
var merge = require('merge-stream');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');


var dest = "../web/"

gulp.task('build', ['vendor', 'controller', 'service', 'partials'], function() {
	gulp.src('build/*')
		// .pipe(concat('manage.min.js'))
		.pipe(gulp.dest(dest + 'js/'));
});

gulp.task('twig', function() {
	merge([
		gulp.src('manage.html.twig')
			.pipe(rename('index.html.twig'))
			.pipe(gulp.dest('../app/Resources/views/manage')),
		gulp.src('shop.html.twig')
			.pipe(rename('index.html.twig'))
			.pipe(gulp.dest('../app/Resources/views/shop'))
		]);
});

gulp.task('vendor', function() {
	return gulp.src([
			'node_modules/angular/angular.js',
			'node_modules/angular-promise-tracker/promise-tracker.js',
			'node_modules/angular-ui-router/release/angular-ui-router.js',
			'node_modules/angular-bootstrap/dist/ui-bootstrap-tpls.js',
			'node_modules/angular-messages/angular-messages.js'
		])
		.pipe(concat('vendor.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('build/'));
});

gulp.task('controller', function() {
	merge([
		gulp.src(['manage.js', 'controllers/*.js', 'controllers/manage/**/*.js'])
			.pipe(concat('manage-controllers.min.js'))
			// .pipe(uglify())
			.pipe(gulp.dest('build/')),
		gulp.src(['shop.js', 'controllers/*.js', 'controllers/shop/**/*.js'])
			.pipe(concat('shop-controllers.min.js'))
			// .pipe(uglify())
			.pipe(gulp.dest('build/'))
	]);
});

gulp.task('service', function() {
	gulp.src(['services/**/*.js'])
		.pipe(concat('services.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('build/'));
});

gulp.task('partials', function() {
	merge([
		gulp.src('./partials/manage/**/*.html')
			.pipe(minifyHtml({
				empty: true,
				spare: true,
				quotes: true
			}))
			.pipe(ngHtml2Js({
				moduleName: 'manage.partials'
			}))
			.pipe(concat('manage-partials.min.js'))
			// .pipe(uglify())
			.pipe(gulp.dest('build/')),
		gulp.src('./partials/shop/**/*.html')
			.pipe(minifyHtml({
				empty: true,
				spare: true,
				quotes: true
			}))
			.pipe(ngHtml2Js({
				moduleName: 'shop.partials'
			}))
			.pipe(concat('shop-partials.min.js'))
			// .pipe(uglify())
			.pipe(gulp.dest('build/')),
		gulp.src('./partials/shared/**/*.html')
			.pipe(minifyHtml({
				empty: true,
				spare: true,
				quotes: true
			}))
			.pipe(ngHtml2Js({
				moduleName: 'shared.partials'
			}))
			.pipe(concat('shared-partials.min.js'))
			// .pipe(uglify())
			.pipe(gulp.dest('build/'))
	]);
})
