import { setupI18n } from '$lib/i18n';
setupI18n();

export const prerender = process.env.GITHUB_PAGES === 'true';