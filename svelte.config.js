import adapterStatic from '@sveltejs/adapter-static';
import adapterNode from '@sveltejs/adapter-node';
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
			handleHttpError: ({ status, path, referrer, referenceType }) => {
				if (status === 429) {
				  console.warn(`Rate limited while prerending ${path}`);
				  return;
				}
			  
				// Throw other errors
				throw new Error(`${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''}`);
			  }
		},
		adapter:
			process.env.ADAPTER === 'VERCEL'
				? adapterNode()
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
			hooks:
				process.env.ADAPTER === 'GITHUB_PAGES'
					? undefined
					: {
							server: 'src/hooks/hooks.server.ts'
						}
		}
	}
};

export default config;
