const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
//
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const htmlmin = require("gulp-htmlmin");
const jsmin = require("gulp-uglify-es").default;
const del = require("del");
const jsconcat = require("gulp-concat");

//Html - минифицируем .pipe(htmlmin({ collapseWhitespace: true }))
const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
}

exports.html = html;

// Scripts .pipe(jsmin()) - для минификации
const script = () => {
  return gulp.src("source/js/*.js")
    .pipe(jsconcat("main.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.jsmin = script;
// Script lib concat
const concatjs = () => {
  return gulp.src("source/js/lib/*.js")
    .pipe(jsconcat("vendor.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.jsconcat = concatjs;
// Styles - обработка scss
const styles = () => {
  return gulp.src("source/sass/style.scss")// берем стили
    .pipe(plumber()) //обработка ошибок, и не дает уппасть
    .pipe(sourcemap.init())// делает карту-дерево
    .pipe(sass()) // sass -> css
    .pipe(postcss([ // задача плагина postcss
      autoprefixer()// ставятся префиксы
    ]))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([ // задача плагина postcss
      csso()
    ]))
    .pipe(rename("style.min.css")) // переименовываем
    .pipe(sourcemap.write(".")) // сравнение ???
    .pipe(gulp.dest("build/css")) //полученый файл складываем в css
    .pipe(sync.stream()); // для обновления сервера
}

exports.styles = styles; // Обьявление, для запуска из консоли задачи: gulp styles

// Images
const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images; // Обьявление, для запуска из консоли задачи: gulp images

// WepB
const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp; // Обьявление, для запуска из консоли задачи: gulp styles

// Sprite

const sprite = () => {
  return gulp.src("source/img/icon/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/icon"))
}

exports.sprite = sprite;
// Copy files
const copy = (done) => {
  // берем файлы указаные в массиве // "source/img/**/*.{jpg,png,svg}" для копирования изображений
  return gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/img/**/*.{jpg,png,svg}",
    "source/*.ico"
  ],
    {
      base: "source" // Указываем базовый уровень, откуда копировать. Иначе скопирует весь путь: "source/fonts/*.{woff2,woff}", а нам нужен только: /fonts/*.{woff2,woff} положить в  build
    })
    .pipe(gulp.dest("build"));
  done();
}

exports.copy = copy;

// Clean
const clean = () => {
  return del("build");
}

exports.clean = clean;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    tunnel: true,

  });
  done();
}

exports.server = server; // Обьявление, для запуска из консоли задачи: gulp server
// Reload

const reload = done => {
  sync.reload();
  done();
}
// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series(script));
  gulp.watch("source/*.html", gulp.series(html, reload));
  // gulp.watch("source/*.html").on("change", sync.reload);
}


// Build
// gulp.series - запускает последовательно задачи, которые внутри
//gulp.parallel - запускает паралельно задачи, которые внутри
//Внутри наши задачи, описанные выше
const mybuild = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    copy,
    sprite,
    images,
    createWebp
  )
)
// вешнее имя = наша функция
exports.build = mybuild;

exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    copy,
    sprite,
    script,
    concatjs,
    images,
    // createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
