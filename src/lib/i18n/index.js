import { register, init, getLocaleFromNavigator } from "svelte-i18n";

register("en", () => import("./en.json"));
register("no", () => import("./no.json"));

export const setupI18n = () => {
    init({
        fallbackLocale: "en",
        initialLocale: getLocaleFromNavigator()
    });
}