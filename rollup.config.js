import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sass from 'rollup-plugin-sass'
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import copy from 'rollup-plugin-copy'


const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		copy({
			targets: [
				{ src: 'src/public/**/*', dest: 'public' },
			]
		}),
		json(),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/bundle.css');
			},
			// preprocess: autoPreprocess({ /* options */ })
		}),
		sass({
			output: function (styles, styleNodes) {
				styleNodes.forEach(node => {
					let filename = node.id.replace(/^.*[\\\/]/, '')
					filename = filename.replace("scss", "css")
					if (!existsSync('public/themes')) {
						mkdirSync('public/themes', { recursive: true })
					}
					writeFileSync('public/themes/' + filename, node.content)

				});

			}

		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
