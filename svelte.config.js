import adapterStatic from '@sveltejs/adapter-static';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		csrf: {
			checkOrigin: true
		},
		prerender: {
			entries: ['*'],
			handleHttpError: ({ message }) => {

			  if (message.includes('429')) {
				return;
			  }
			  
			  // Throw other errors
			  throw new Error(message);
			}
		  },
		adapter:
			process.env.ADAPTER === 'vercel'
				? adapterVercel()
				: adapterStatic({
						pages: 'build',
						assets: 'build',
						fallback: '404.html',
						precompress: false,
						strict: true
					}),
		csp: {
			mode: 'auto',
			directives: {
				'script-src': ["'self'", 'https://www.googletagmanager.com'],
				'script-src-elem': ["'self'", 'https://www.googletagmanager.com'],
				'object-src': ["'self'"],
				'base-uri': ["'self'"]
			}
		},
		files: {
			hooks: {
				server: './src/hooks/hooks.server.ts'
			}
		}
	}
};

export default config;
