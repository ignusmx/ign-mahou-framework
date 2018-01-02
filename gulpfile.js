/* run this command to install dependencies before running gulp: 
    npm install gulp gulp-concat gulp-html-replace gulp-htmlmin gulp-ng-annotate gulp-rename gulp-uglify --save
*/
//gulpfile.js
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

//script paths
var dist = "dist";

var modules_js = [
					'src/mahou.js',
					'src/helpers/**/*.js',
					'src/helpers/mh-validation-helper.js',
					'src/directives/mh-compile.js',
					'src/decorators/mh-bs-decorator.js',
					'src/ui-elements/mh-abstract-ui-element.js',
					'src/ui-elements/mh-form-bs-row.js',
					'src/ui-elements/mh-form-bs-col.js',
					'src/ui-elements/mh-form-label.js',
					'src/ui-elements/mh-button.js',
					'src/ui-elements/mh-dropdown-button.js',
					'src/ui-elements/mh-form-button.js',
					'src/ui-elements/mh-abstract-form-field.js',
					'src/ui-elements/mh-form-field-input.js',
					'src/ui-elements/mh-form-field-input-text.js',
					'src/ui-elements/mh-form-field-input-password.js',
					'src/ui-elements/mh-form-field-input-email.js',
					'src/ui-elements/mh-form-field-input-number.js',
					'src/ui-elements/mh-form-field-input-date.js',
					'src/ui-elements/mh-form-field-select.js',
					'src/ui-elements/mh-form-field-md-select.js',
					'src/ui-elements/mh-form-field-md-date.js',
					'src/ui-elements/mh-form-field-md-autocomplete.js',
					'src/ui-elements/mh-datagrid-col.js',
					'src/directives/mh-bs-panel/mh-bs-panel.js',
					'src/directives/mh-datagrid/mh-datagrid-ctrl.js',
					'src/directives/mh-datagrid/mh-datagrid.js',
					'src/directives/mh-datagrid/themes/mh-datagrid-theme-custom.js',
					'src/directives/mh-datagrid/themes/mh-datagrid-theme-bs.js',
					'src/directives/mh-form/mh-form-ctrl.js',
					'src/directives/mh-form/mh-form.js',
					'src/directives/mh-form/themes/mh-form-theme-custom.js',
					'src/directives/mh-form/themes/mh-form-theme-bs.js',
					'src/directives/mh-side-navbar/mh-side-navbar.js',
					'src/directives/mh-navbar/mh-navbar-ctrl.js',
					'src/directives/mh-navbar/mh-navbar.js',
					'src/directives/mh-navbar/themes/mh-navbar-theme-custom.js',
					'src/directives/mh-navbar/themes/mh-navbar-theme-bs.js',
					'src/directives/mh-paginator/mh-paginator-ctrl.js',
					'src/directives/mh-paginator/mh-paginator.js',
					'src/directives/mh-paginator/themes/mh-paginator-theme-custom.js',
					'src/directives/mh-paginator/themes/mh-paginator-theme-bs.js'
                ];

    var modules_css = ['src/css/**/*.css'];

    var jsDest = dist;
    var cssDest = dist;


gulp.task('compressJS', function() {

    var jsFiles = modules_js;

    return gulp.src(jsFiles)
    .pipe(concat('ign-mahou.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(jsDest))
});

gulp.task('compressMinJS', function() {

    var jsFiles = modules_js;

    return gulp.src(jsFiles)
    .pipe(concat('ign-mahou.min.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(jsDest))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task('compressCSS', function() {

    var cssFiles = modules_css;

    return gulp.src(cssFiles)
    .pipe(concat('ign-mahou.min.css'))
    .pipe(gulp.dest(cssDest));
});


gulp.task('dist', ['compressJS', 'compressMinJS', 'compressCSS']);
