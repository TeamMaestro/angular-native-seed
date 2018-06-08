const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-string-replace')
const debug = require('gulp-debug');
const del = require('del');
const flatten = require('gulp-flatten');
const SRC = 'src/';
const DEST = 'app/';

function removeTns(path) {
    path.basename = path.basename.replace('.tns', '');
}

function removePhone(path) {
    path.basename = path.basename.replace('.phone', '');
}

gulp.task('clean.Dist', () => {
    return del([
        'app/**/*',

        '!**/vendor.ts',
        '!**/vendor-platform.android.ts',
        '!**/vendor-platform.ios.ts',
        '!**/_app.-common.scss',
        '!**/app.android.scdd',
        '!**/app.ios.scss',
        '!**/scss/**'
    ]);
});

gulp.task('resources.App_Resources', () => {
    return gulp.src(['App_Resources/**/*'], { follow: true })
        .pipe(gulp.dest(`${DEST}App_Resources`));
});

gulp.task('copy_www', () => {
    return gulp.src(['www/**/*'], { follow: true })
        .pipe(debug({ title: 'copy_www' }))
        .pipe(gulp.dest(`${DEST}www`));
});


// gulp.task('resources.SCSS', () => {
//     return gulp.src(['scss/**/*'], { follow: true })
//         .pipe(gulp.dest(`${DEST}scss`));
// });

gulp.task('resources.Assets', () => {
    return gulp.src([`${SRC}**/*`, `!${SRC}app/`, `!${SRC}test/`, '!**/*.spec.*', '!**/*.js', '!**/*.ts', '!**/*.scss', '!**/*.sass', '!**/*.html'], { follow: true })
        // .pipe(debug({title: 'resources.Assets'}))
        .pipe(gulp.dest(DEST));
});

gulp.task('project.Typescript', () => {
    return gulp.src([`${SRC}**/*.ts`, '!**/*.tns.*', '!**/*.spec.*'], { follow: true })
        // .pipe(debug({title: 'project.Typescript'}))
        .pipe(gulp.dest(DEST));
});

gulp.task('project.Styles', () => {
    return gulp.src([`${SRC}**/*.scss`, `${SRC}**/*.sass`, '!**/*.tns.*'], { follow: true })
        .pipe(gulp.dest(DEST));
});

gulp.task('tns.Typescript', () => {
    return gulp.src([`${SRC}**/*.tns.ts`], { follow: true })
        .pipe(rename(removeTns))
        // .pipe(debug({title: 'tns.Typescript'}))
        .pipe(gulp.dest(DEST, { overwrite: true }));
});

gulp.task('tns.Templates', () => {
    return gulp.src([`${SRC}**/*.tns.html`, `${SRC}**/*.tns.ios.html`, `${SRC}**/*.tns.android.html`], { follow: true })
        .pipe(rename(removeTns))
        // .pipe(debug({title: 'tns.Templates'}))
        .pipe(gulp.dest(DEST, { overwrite: true }));
});

gulp.task('tns.Styles', () => {
    return gulp.src([`${SRC}**/*.tns.scss`, `${SRC}**/*.tns.ios.scss`, `${SRC}**/*.tns.android.scss`, `${SRC}**/*.tns.sass`, `${SRC}**/*.tns.ios.sass`, `${SRC}**/*.tns.android.sass`], { follow: true })
        .pipe(rename(removeTns))
        // .pipe(debug({title: 'tns.Styles'}))
        .pipe(gulp.dest(DEST, { overwrite: true }));
});

gulp.task('phone.Typescript', () => {
    return gulp.src([`${SRC}**/*.tns.phone.ts`], { follow: true })
        .pipe(rename(removeTns))
        .pipe(rename(removePhone))
        // .pipe(debug({title: 'phone.Typescript'}))
        .pipe(gulp.dest(DEST, { overwrite: true }));
});

gulp.task('phone.Templates', () => {
    return gulp.src([`${SRC}**/*.tns.phone.html`, `${SRC}**/*.tns.ios.phone.html`, `${SRC}**/*.tns.android.phone.html`], { follow: true })
        .pipe(rename(removeTns))
        .pipe(rename(removePhone))
        // .pipe(debug({title: 'phone.Templates'}))
        .pipe(gulp.dest(DEST, { overwrite: true }));
});

gulp.task('phone.Styles', () => {
    return gulp.src([`${SRC}**/*.tns.phone.scss`, `${SRC}**/*.tns.ios.phone.scss`, `${SRC}**/*.tns.android.phone.scss`, `${SRC}**/*.tns.phone.sass`, `${SRC}**/*.tns.ios.phone.sass`, `${SRC}**/*.tns.android.phone.sass`], { follow: true })
        .pipe(rename(removeTns))
        .pipe(rename(removePhone))
        // .pipe(debug({title: 'phone.Styles'}))
        .pipe(gulp.dest(DEST, { overwrite: true }));
});

gulp.task(
    'build.Default',
    gulp.series(
        'clean.Dist',
        'resources.App_Resources',
        'copy_www',
        // 'resources.SCSS',
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

/**
 * For non webpack builds, scss/sass needs to be converted to css
 */
gulp.task('tns.ComponentStyles', () => {
    return gulp.src([`${DEST}/**/*.component.ts`], { follow: true })
        .pipe(replace('.scss\'', '.css\'', { logs: { enabled: false } }))
        .pipe(replace('.sass\'', '.css\'', { logs: { enabled: false } }))
        // .pipe(debug({title: 'tns.ComponentStyles'}))
        .pipe(gulp.dest(DEST, { overwrite: true }));
});

gulp.task(
    'build.cli.Default',
    gulp.series(
        'build.Default',
        'tns.ComponentStyles'
    )
);

gulp.task(
    'build.cli.Phone',
    gulp.series(
        'build.Phone',
        'tns.ComponentStyles'
    )
);

gulp.task('tns.Livesync', () => {
    return gulp.watch([`../${SRC}**/*.common.ts`, `../${SRC}**/*.tns.ts`, `../${SRC}**/*.tns.html`, `../${SRC}**/*.service.ts`,
    `../${SRC}**/*.tns.scss`, `../${SRC}**/*.scss`, `../${SRC}**/*.component.ts`, `../${SRC}**/*.routes.ts`,`../${SRC}**/*.reducer.ts`,
    `../${SRC}**/*.index.ts`, `./www/**/*`])
        .on('change', (file) => {
            // console.log('original File :- ' + file);
            // console.log('step 1 :-  ' + file.substring(0, file.lastIndexOf('\\') + 1));
            // console.log('step 2 :-  ' + file.substring(0, file.lastIndexOf('\\') + 1).replace(SRC.substring(0, SRC.length - 1), 'app\\'));
            // console.log('step 3 :-  ' + file.substring(0, file.lastIndexOf('\\') + 1).replace(SRC.substring(0, SRC.length - 1), 'app\\').replace('..\\', ''));
            var outputDest = file.substring(0, file.lastIndexOf('\\') + 1).replace(SRC.substring(0, SRC.length - 1), 'app\\').replace('..\\', '');
            // var outputDest = 'app\\';
            // console.log('isWWW :- ', outputDest === 'www\\');
            if (outputDest === 'www\\') {
                outputDest = 'app\\';
            }
            // console.log('final output :-   ' + outputDest);
            gulp.src([file])
                .pipe(rename(removeTns))
                .pipe(replace('.scss\'', '.css\'', { logs: { enabled: true } }))
                .pipe(flatten())
                .pipe(debug({ title: 'tns.Livesync' }))
                .pipe(debug({ title: 'out ' + outputDest }))
                .pipe(gulp.dest(outputDest, { overwrite: true }));
        });
});

gulp.task('tns.Livesync.Phone', () => {
    return gulp.watch([`${SRC}**/*.tns.phone.html`, `${SRC}/**/*.tns.phone.scss`, `${SRC}/**/*.tns.phone.sass`, `${SRC}/**/*.component.ts`])
        .on('change', (file) => {
            var outputDest = file.replace(SRC, DEST);
            outputDest = outputDest.substring(0, outputDest.lastIndexOf('/'));
            gulp.src([file])
                .pipe(rename(removeTns))
                .pipe(rename(removePhone))
                .pipe(replace('.scss\'', '.css\'', { logs: { enabled: false } }))
                .pipe(replace('.sass\'', '.css\'', { logs: { enabled: false } }))
                .pipe(debug({ title: 'tns.Livesync.Phone' }))
                .pipe(gulp.dest(outputDest, { overwrite: true }));
        });
});
