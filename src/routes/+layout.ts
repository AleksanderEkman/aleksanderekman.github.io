import { setupI18n } from '$lib/i18n';
setupI18n();

export const prerender = import.meta.env.DEV || process.env.GITHUB_PAGES === 'true';