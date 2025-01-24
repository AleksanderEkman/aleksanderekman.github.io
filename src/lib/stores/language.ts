import { writable } from 'svelte/store';

const allowedLanguages = ['en-US', 'no'];
const defaultLanguage = 'en-US';

// This will be replaced during SSR
let initialLanguage = defaultLanguage;

// Create the store
export const language = writable(initialLanguage);

// Function to set the language
export function setLanguage(lang: string) {
    if (allowedLanguages.includes(lang)) {
        language.set(lang);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('language', lang);
        }
    }
}

// Function to initialize language on the client side
export function initLanguage() {
    if (typeof localStorage !== 'undefined') {
        const storedLang = localStorage.getItem('language');
        if (storedLang && allowedLanguages.includes(storedLang)) {
            language.set(storedLang);
        }
    }
}
