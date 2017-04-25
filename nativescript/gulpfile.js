const gulp = require('gulp');
const rename = require('gulp-rename');
const debug = require('gulp-debug');

const SRC = 'src/';
const DEST = 'app/';

function removeTns (path) {
    path.basename = path.basename.replace('.tns', '');
}

function removePhone (path) {
    path.basename = path.basename.replace('.phone', '');
}

gulp.task('resources.App_Resources', () => {
    return gulp.src(['App_Resources/**/*'], {follow: true})
        .pipe(gulp.dest(`${DEST}/App_Resources`));
});

gulp.task('resources.Assets', () => {
    return gulp.src(['src/**/*', '!src/app/', '!src/test/', '!**/*.spec.*', '!**/*.js', '!**/*.ts', '!**/*.scss', '!**/*.html'], {follow: true})
        .pipe(gulp.dest(DEST));
});

gulp.task('project.Typescript', () => {
    return gulp.src(['src/**/*.ts', '!**/*.tns.*'], {follow: true})
        .pipe(debug({title: 'project.Typescript'}))
        .pipe(gulp.dest(DEST));
});

gulp.task('project.Styles', () => {
    return gulp.src(['src/**/*.scss', '!**/*.tns.*'], {follow: true})
        .pipe(gulp.dest(DEST));
});

gulp.task('tns.Typescript', () => {
    return gulp.src(['src/**/*.tns.ts'], {follow: true})
        .pipe(rename(removeTns))
        // .pipe(debug({title: 'tns.Typescript'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task('tns.Templates', () => {
    return gulp.src(['src/**/*.tns.html', 'src/**/*.tns.ios.html', 'src/**/*.tns.android.html'], {follow: true})
        .pipe(rename(removeTns))
        .pipe(debug({title: 'tns.Templates'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task('tns.Styles', () => {
    return gulp.src(['src/**/*.tns.scss', 'src/**/*.tns.ios.scss', 'src/**/*.tns.android.scss'], {follow: true})
        .pipe(rename(removeTns))
        // .pipe(debug({title: 'tns.Styles'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task('phone.Typescript', () => {
    return gulp.src(['src/**/*.tns.phone.ts'], {follow: true})
        .pipe(rename(removeTns))
        .pipe(rename(removePhone))
        .pipe(debug({title: 'phone.Typescript'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task('phone.Templates', () => {
    return gulp.src(['src/**/*.tns.phone.html', 'src/**/*.tns.ios.phone.html', 'src/**/*.tns.android.phone.html'], {follow: true})
        .pipe(rename(removeTns))
        .pipe(rename(removePhone))
        .pipe(debug({title: 'phone.Templates'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task('phone.Styles', () => {
    return gulp.src(['src/**/*.tns.phone.scss', 'src/**/*.tns.ios.phone.scss', 'src/**/*.tns.android.phone.scss'], {follow: true})
        .pipe(rename(removeTns))
        .pipe(rename(removePhone))
        .pipe(debug({title: 'phone.Styles'}))
        .pipe(gulp.dest(DEST, {overwrite: true}));
});

gulp.task(
    'build.Default',
    gulp.series(
        'resources.App_Resources',
        'resources.Assets',
        'project.Typescript',
        'project.Styles',
        'tns.Templates',
        'tns.Styles',
        'tns.Typescript'
    )
);

gulp.task(
    'build.Phone',
    gulp.series(
        'build.Default',
        'phone.Typescript',
        'phone.Templates',
        'phone.Styles'
    )
);
