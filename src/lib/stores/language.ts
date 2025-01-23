import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const allowedLanguages = ['en-US', 'no'];
const storedLanguage = browser ? localStorage.getItem('language') : null;
const initialLanguage = storedLanguage && allowedLanguages.includes(storedLanguage) ? storedLanguage : 'no';

export const language = writable(initialLanguage);

if (browser) {
    language.subscribe((newLang) => {
        localStorage.setItem('language', newLang);
    });
}