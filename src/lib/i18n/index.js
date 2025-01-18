import { register, init } from "svelte-i18n";
import { get } from 'svelte/store';
import { language } from '../stores/language';

register("en", () => import("./en.json"));
register("no", () => import("./no.json"));

export const setupI18n = () => {
    init({
        fallbackLocale: "en",
        initialLocale: get(language)
    });

    language.subscribe((newLang) => {
        init({
            fallbackLocale: "en",
            initialLocale: newLang
        });
    });
}
