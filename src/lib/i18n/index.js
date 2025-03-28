import { register, init } from 'svelte-i18n';
import { get } from 'svelte/store';
import { language } from '../stores/language';

register('en-US', () => import('./en-US.json'));
register('no', () => import('./no.json'));

export const setupI18n = () => {
	init({
		fallbackLocale: 'no',
		initialLocale: get(language)
	});

	language.subscribe((newLang) => {
		init({
			fallbackLocale: 'no',
			initialLocale: newLang
		});
	});
};
