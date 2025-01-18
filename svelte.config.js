import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		csrf: {
			checkOrigin: true
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		csp: {
			mode: 'auto',
			directives: {
				'script-src': ["'self'"],
				'script-src-elem': ["'self'"],
				'object-src': ["'self'"],
				'base-uri': ["'self'"]
			}
		}
	}
};

export default config;