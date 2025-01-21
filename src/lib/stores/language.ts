import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const language = writable(browser ? localStorage.getItem('language') || 'en-US' : 'en-US');

language.subscribe((value) => {
	if (browser) {
		localStorage.setItem('language', value);
	}
});
