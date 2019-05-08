var gulp = require('./node_modules/_gulp@3.9.1@gulp');

// 'js/*' ->js文件夹下面的所有文件
//'js/**/*.js' js文件夹下面的所有文件夹下面的所有js文件

// 在命令行设置为生产环境或者开发环境
// windows: set NODE_ENV = development 或 production 
// mac  linux : export NODE_ENV = development 或 production
var environment = process.env.NODE_ENV || 'development';

const folder = {
    src: "src/",
    dist: 'dist/'
}

//开发环境不要使用压缩，会影响找错

// 压缩html代码
const htmlClean = require('./node_modules/_gulp-htmlclean@2.7.22@gulp-htmlclean/lib/gulp-htmlclean');

// 图片类： 压缩PNG, JPEG, GIF and SVG
const imageMin = require('./node_modules/_gulp-imagemin@5.0.3@gulp-imagemin');

// uglify 不支持压缩 es6 ， 需要先使用babel降级才行 */
const uglifyJS = require('./node_modules/_gulp-uglify@3.0.2@gulp-uglify')
//es6 降级到es5    请使用  "gulp-babel": "^7.0.1", 
//切记不要用 8版本， 会出现无法输出的情况
const babel = require('./node_modules/_gulp-babel@7.0.1@gulp-babel');
//去除掉 注释， console 和 debugger
const removeComments = require('./node_modules/_gulp-strip-debug@3.0.0@gulp-strip-debug')

//less 转 css
const less = require('./node_modules/_gulp-less@4.0.1@gulp-less');
//css3 兼容各类浏览器脚本
const postCss = require('./node_modules/_gulp-postcss@8.0.0@gulp-postcss');
const autoPrefixer = require('./node_modules/_autoprefixer@9.5.1@autoprefixer/lib/autoprefixer');
//css代码压缩
const cleanCss = require('./node_modules/_gulp-clean-css@4.2.0@gulp-clean-css');

//创建服务器环境
const connect = require("./node_modules/_gulp-connect@5.7.0@gulp-connect");

gulp.task('html', function () {
    const step = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
    if (environment == 'production') {
        step.pipe(htmlClean())
    }
    step.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task('img', function () {
    gulp.src(folder.src + "images/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "images/"))
})

gulp.task('css', function () {
    var step = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoPrefixer()]))
    if (environment == 'production') {
        step.pipe(cleanCss())
    }
    step.pipe(cleanCss())
        .pipe(gulp.dest(folder.dist + "css/"))

})

gulp.task('js', function () {
    var step = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        .pipe(babel({
            presets: ['es2015']
        }))
    if (environment == 'production') {
        step.pipe(removeComments())
            .pipe(uglifyJS())
    }
    step.pipe(gulp.dest(folder.dist + "js/"))
})


gulp.task('server', function () {
    connect.server({
        port: 8888,
        livereload: true
    })
})

gulp.task('watch', () => {
    gulp.watch(folder.src + "html/*", ['html']);
    gulp.watch(folder.src + "css/*", ['css']);
    gulp.watch(folder.src + "js/*", ['js'])
})

// default任务一定要写，不然会报警告： Task 'default' is not in your gulpfile
// 数组中写哪一个执行哪一个任务， 从左到右执行
gulp.task("default", ["html", "img", "css", "js", "server", "watch"])

// gulp.src()
// gulp.dest()
// gulp.task()
// gulp.watch()

