const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge2 = require('merge2');
const path = require('path');
const fs = require('fs-extra');

const distPath = path.join(__dirname, 'lib');
if (fs.existsSync(distPath)) {
  fs.removeSync(distPath);
}

const tsProject = ts.createProject('tsconfig.json', {
  declaration: true,
  outDir: 'lib',
});

gulp.task('default', () => {
  const tsResult = gulp.src([
    'src/**/*.tsx',
    'src/**/*.ts',
    '!src/__tests__/**/*.tsx',
  ]).pipe(tsProject());

  return merge2([
    tsResult.dts.pipe(gulp.dest('lib')),
    tsResult.js.pipe(gulp.dest('lib'))
  ]);
});
