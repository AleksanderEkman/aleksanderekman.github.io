import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
export const prerender = import.meta.env.DEV || process.env.GITHUB_PAGES === 'true';
if (import.meta.env.VERCEL === 'true') {
	injectSpeedInsights();
}
