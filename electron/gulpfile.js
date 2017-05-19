const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-string-replace')
const debug = require('gulp-debug');
const electron = require('gulp-atom-electron');
const symdest = require('gulp-symdest');
const newer = require('gulp-newer');

const SRC = 'src/';
const DEST = 'app/';

function removeDesktop (path) {
    path.basename = path.basename.replace('.desktop', '');
}

gulp.task('resources.Assets', () => {
    return gulp.src([
        `${SRC}**/*`,
        'tsconfig.*',
        `!${SRC}app/`,
        `!${SRC}test/`,
        `!${SRC}**/*.spec.*`,
        `!${SRC}**/*.js`,
        `!${SRC}**/*.ts`,
        `!${SRC}**/*.scss`,
        `!${SRC}**/*.tns.html`], {follow: true})
        // .pipe(debug({title: 'resources.Assets'}))
        .pipe(gulp.dest(DEST));
});

gulp.task('desktop.Modules', () => {
    return gulp.src([`${SRC}**/*.component.ts`], {follow: true})
        .pipe(replace('moduleId: module.id,', '', { logs: { enabled: false }}))
        .pipe(debug({title: 'desktop.Modules'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task('project.Typescript', () => {
    return gulp.src([`${SRC}**/*.ts`, `!${SRC}**/*.tns.*`, `!${SRC}**/*.spec.*`], {follow: true})
        // .pipe(debug({title: 'project.Typescript'}))
        .pipe(gulp.dest(DEST));
});

gulp.task('project.Styles', () => {
    return gulp.src([`${SRC}**/*.scss`, '!**/*.tns.*'], {follow: true})
        .pipe(gulp.dest(DEST));
});

gulp.task('desktop.Typescript', () => {
    return gulp.src([`${SRC}**/*.desktop.ts`, `${SRC}/main.ts`], {follow: true})
        .pipe(rename(removeDesktop))
        // .pipe(debug({title: 'desktop.Typescript'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task('desktop.Templates', () => {
    return gulp.src([`${SRC}**/*.desktop.html`, `${SRC}/index.html`], {follow: true})
        .pipe(rename(removeDesktop))
        // .pipe(debug({title: 'desktop.Templates'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task('desktop.Styles', () => {
    return gulp.src([`${SRC}**/*.desktop.scss`], {follow: true})
        .pipe(rename(removeDesktop))
        // .pipe(debug({title: 'desktop.Styles'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task('desktop.Livesync', () => {
    return gulp.watch([`${SRC}**/*.desktop.html`, `${SRC}/**/*.desktop.scss`, `${SRC}/**/*.component.ts`])
        .on('change', (file) => {
            var outputDest = file.replace(SRC, DEST);
            outputDest = outputDest.substring(0, outputDest.lastIndexOf('/'));
            gulp.src([file])
                .pipe(rename(removeDesktop))
                .pipe(replace('.scss\'', '.css\'', { logs: { enabled: false }}))
                .pipe(debug({title: 'desktop.Livesync'}))
                .pipe(gulp.dest(outputDest, {overwrite: true}));
        });
});

gulp.task('desktop.Build', () => {
    return gulp.src(DEST)
        .pipe(newer(
            {
                dest: DEST,
                map: (path) => {
                    return path.replace('.ts', '.js').replace('.scss', '.css');
                }
            }
        ))
        .pipe(gulp.dest(DEST));
});

gulp.task('desktop.Run', () => {
    return gulp.src(DEST)
        .pipe(electron({ version: '0.37.2', platform: 'darwin' }))
        .pipe(symdest('desktop/mac'));
});

gulp.task('desktop.Electron', () => {
    return gulp.src([`${SRC}/electron.js`])
        // .pipe(debug({title: 'desktop.electron'}))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('dist'));
})


gulp.task(
    'build.Default',
    gulp.series(
        'resources.Assets',
        'project.Typescript',
        'project.Styles',
        'desktop.Templates',
        'desktop.Styles',
        'desktop.Typescript',
        'desktop.Modules',
        'desktop.Build'
    )
);
