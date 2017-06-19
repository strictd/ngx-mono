var fs = require('fs');

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var ejs = require('gulp-ejs');
var gls = require('gulp-live-server');
var gulpif = require('gulp-if');
var open = require('gulp-open');
var prettify = require('gulp-prettify');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var del = require('del');
var highlight = require('highlight.js');
var marked = require('marked');
var yaml = require('js-yaml');
var path = require('path');
var minimist = require('minimist');
var args = minimist(process.argv);
var docPath = (args.docs) ? path.resolve(process.env.INIT_CWD, args.docs) : process.env.INIT_CWD;
var relPath = path.relative('./', docPath);
var sourcePath = '../_shared/slate-docs/';

var renderer = new marked.Renderer();
var COMPRESS = true;

renderer.code = function (code, language) {
  var highlighted = language ? highlight.highlight(language, code).value
                             : highlight.highlightAuto(code).value;

  return '<pre class="highlight ' + language + '"><code>' + highlighted + '</code></pre>';
};

var readIndexYml = function() {
  return yaml.safeLoad(fs.readFileSync(path.join(relPath, 'index.yml'), 'utf8'));
};

var getPageData = function() {
  var config = readIndexYml();

  var includes = config.includes
        .map(function(include) { return path.join(relPath, `${include}.md`); })
        .map(function(include) { return fs.readFileSync(include, 'utf8'); })
        .map(function(include) { return marked(include, { renderer: renderer }); });

  return {
    current_page: {
      data: config
    },
    page_classes: '',
    includes: includes,
    image_tag: function(filename, alt, className) {
      return '<img alt="' + alt + '" class="' + className + '" src="images/' + filename + '">';
    },
    javascript_include_tag: function(name) {
      return '<script src="javascripts/' + name + '.js" type="text/javascript"></script>';
    },
    stylesheet_link_tag: function(name, media) {
      return '<link href="stylesheets/' + name + '.css" rel="stylesheet" type="text/css" media="' + media + '" />';
    },
    langs: (config.language_tabs || []).map(function(lang) {
      return typeof lang == 'string' ? lang : lang.keys.first;
    })
  };
};

gulp.task('clean', function (_cb) {
 del([path.join(relPath, 'build/', '*')]).then(_cb());
});

gulp.task('fonts', function() {
  return gulp.src([
    path.join(sourcePath, 'fonts/**/*'),
    path.join(relPath, 'fonts/**/*')
  ]).pipe(gulp.dest(path.join(relPath, 'build/fonts')));
});

gulp.task('images', function() {
  return gulp.src([
    path.join(sourcePath, 'images/**/*'),
    path.join(relPath, 'images/**/*')
  ]).pipe(gulp.dest(path.join(relPath, 'build/images')));
});

gulp.task('js', function() {
  var config = readIndexYml();
  var libs = [
    path.join(sourcePath, 'javascripts/lib/_energize.js'),
    path.join(sourcePath, 'javascripts/lib/_jquery.js'),
    path.join(sourcePath, 'javascripts/lib/_jquery_ui.js'),
    path.join(sourcePath, 'javascripts/lib/_jquery.tocify.js'),
    path.join(sourcePath, 'javascripts/lib/_imagesloaded.min.js'),
  ];
  var scripts = [
    path.join(sourcePath, 'javascripts/app/_lang.js'),
    path.join(sourcePath, 'javascripts/app/_toc.js'),
  ];

  if (config.search) {
    libs.push(path.join(sourcePath, 'javascripts/lib/_lunr.js'));
    libs.push(path.join(sourcePath, 'javascripts/lib/_jquery.highlight.js'));
    libs.push(path.join(sourcePath, 'javascripts/app/_search.js'));
  }

  return gulp.src(libs.concat(scripts))
    .pipe(concat('all.js'))
    .pipe(gulpif(COMPRESS, uglify()))
    .pipe(gulp.dest(path.join(relPath, 'build/javascripts')));
});

gulp.task('sass', function () {
  return gulp.src([
    path.join(sourcePath, 'stylesheets/*.css.scss'),
    path.join(relPath, 'stylesheets/*.css.scss')
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ extname: ''}))
    .pipe(gulpif(COMPRESS, cleanCSS()))
    .pipe(gulp.dest(path.join(relPath, 'build/stylesheets')));
});

gulp.task('highlightjs', function () {
  var config = readIndexYml();
  var stylePath = '../node_modules/highlight.js/styles/' + config.highlight_theme + '.css';
  return gulp.src(stylePath)
    .pipe(rename({ prefix: 'highlight-'}))
    .pipe(gulpif(COMPRESS, cleanCSS()))
    .pipe(gulp.dest(path.join(relPath, 'build/stylesheets')));
});

gulp.task('html', function () {
  var data = getPageData();
  return gulp.src([
    path.join(sourcePath, '*.html'),
    path.join(relPath, '*.html')
  ])
  	.pipe(ejs(data).on('error', gutil.log))
    .pipe(gulpif(COMPRESS, prettify({indent_size: 2})))
    .pipe(gulp.dest(path.join(relPath, 'build')));
});

gulp.task('NO_COMPRESS', function() {
  COMPRESS = false;
});

gulp.task('default', ['fonts', 'images', 'highlightjs', 'js', 'sass', 'html']);

gulp.task('serve', ['NO_COMPRESS', 'clean', 'default'], function() {

  gulp.watch([path.join(sourcePath, '*.html'), path.join(sourcePath, 'includes/**/*')], ['html']);
  gulp.watch(path.join(sourcePath, 'javascripts/**/*'), ['js']);
  gulp.watch(path.join(sourcePath, 'stylesheets/**/*'), ['sass']);
  gulp.watch(path.join(relPath, 'index.yml'), ['highlightjs', 'js', 'html']);

  var server = gls.static(path.join(relPath, 'build'), 4567);
  server.start();

  gulp.watch([path.relative(relPath, 'build/**/*')], function (file) {
    server.notify.apply(server, [file]);
  });

  gulp.src(__filename).pipe(open({uri: 'http://localhost:4567'}));
});
