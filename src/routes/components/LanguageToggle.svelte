<script lang="ts">
    import { locale } from 'svelte-i18n';
    
    import { get } from 'svelte/store';

    let currentLocale: string | null | undefined;

    const changeLanguage = (lang: string) => {
        locale.set(lang);
        currentLocale = lang;
    };
</script>

<div class="lang-menu">
    <li role="menuitem">
        <button id="no-button" class:active={currentLocale === 'no'} onclick={() => changeLanguage('no')}
            tabindex="0" aria-label="Norwegian language"
            title="Norwegian Language" aria-current={currentLocale === 'no' ? 'page' : undefined}>
            NO
        </button>
        <button id="en-button" class:active={currentLocale === 'en'} onclick={() => changeLanguage('en')}
            tabindex="0" aria-label="English language"
            title="English Language" aria-current={currentLocale === 'en' ? 'page' : undefined}>
            EN
        </button>
    </li>
</div>

<style>
    .lang-menu {
        font-size: 1.3rem;
        width: auto;
    }
    button:hover {
        cursor: none;
    }
    .lang-menu li {
        gap: 5rem;
    }
    button.active {
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        .lang-menu {
            width: 20%;
        }
    }
</style>