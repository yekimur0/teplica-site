const gulp = require( 'gulp' );
const { pipeline } = require( 'stream' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const sourcemaps = require( 'gulp-sourcemaps' );
const csso = require( 'gulp-csso' );
const uglify = require( 'gulp-uglify' );
const concat = require( 'gulp-concat' );
const srcFolder = "./src";
const buildFolder = "./app";
const paths = {
  srcSvg: `${srcFolder}/img/svg/**.svg`,
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,
  srcScss: `${srcFolder}/scss/**/*.scss`,
  buildCssFolder: `${buildFolder}/css`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMainJs: `${srcFolder}/js/main.js`,
  buildJsFolder: `${buildFolder}/js`,
  srcPartialsFolder: `${srcFolder}/partials`,
  resourcesFolder: `${srcFolder}/resources`,
};


async function sass_compile(cb) {
	const autoprefixer = (await import('gulp-autoprefixer')).default; // Используем import()

	return pipeline(
		gulp.src('./assets/scss/**/style.scss'),
		sourcemaps.init(),
		sass().on('error', sass.logError),
		autoprefixer(),
		csso({
			restructure: true,
			sourceMap: true,
			debug: true,
			comments: 'exclamation',
		}),
		sourcemaps.write('./'),
		gulp.dest('./'),
		(err) => {
			if (err) {
				console.error('Таск sass_compile выдал ошибку.', err.toString());
			}
		});
}

function minify_js ( cb ) {
	return pipeline(
		gulp.src( './assets/js/*' ),
		sourcemaps.init(),
		uglify().on( 'error', function ( err ) {
			console.log( 'Таск minify_js выдал ошибку: \n ' + err )
		} ),
		concat( 'main.js' ),
		sourcemaps.write( './' ),
		gulp.dest( './' ),
		( err ) => {
		}
	);
}

async function webpImages() {
	const webp = (await import('gulp-webp')).default;
	return gulp.src(['./assets/images/**/*.{jpg,jpeg,png}'], { encoding: false })
	  .pipe(webp({
		quality: 90,
		method: 6,
		effort: 4
	  }))
	  .pipe(gulp.dest('./assets/images'));
}

gulp.task( 'sass_compile', sass_compile );
gulp.task( 'minify_js', minify_js );
gulp.task( 'webp', webpImages );
gulp.task( 'build', gulp.series( sass_compile, minify_js, webpImages ) );

gulp.task( 'watch', function () {
	gulp.watch( './assets/scss/**/*.scss', gulp.series( sass_compile ) );
	gulp.watch( './assets/js/*', gulp.series( minify_js ) );
	gulp.watch('./assets/images/**/*.{jpg,jpeg,png}', webpImages);
} );