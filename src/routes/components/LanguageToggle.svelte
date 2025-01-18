<script lang="ts">
    import { locale } from 'svelte-i18n';
    import { getLocaleFromNavigator } from 'svelte-i18n';
    
    let currentLocale = getLocaleFromNavigator();

    const changeLanguage = (lang: string) => {
        locale.set(lang);
        currentLocale = lang;
    };
</script>


<div class="lang-menu" role="menubar" aria-label="Language selection">
    <button id="no-button" class:active={currentLocale === 'no'} 
            onclick={() => changeLanguage('no')}
            tabindex="0" aria-label="Select Norwegian language"
            title="Norwegian Language" aria-current={currentLocale === 'no' ? 'true' : undefined}>
        NO
    </button>
    <button id="en-button" class:active={currentLocale === 'en-US'} 
            onclick={() => changeLanguage('en-US')}
            tabindex="0" aria-label="Select English language"
            title="English Language" aria-current={currentLocale === 'en-US' ? 'true' : undefined}>
        EN
    </button>
</div>

<style>
    .lang-menu {
        display: flex;
        gap: 0.5rem; 
        font-size: 1.3rem;
        padding: 0.5rem; /* Added padding for better touch target */
        border-radius: 5px; /* Rounded corners */
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    }
    button {
        background: transparent;
        border: none;
        cursor: pointer;
        transition: color 0.3s ease, text-decoration 0.3s ease; /* Smooth transition */
        padding: 0.5rem; /* Added padding for better touch target */
    }
    button.active {
        font-weight: bold; /* Make active button more prominent */
        text-decoration: underline; /* Keep underline for active state */
    }
    button:hover {
        color: #b3a494; /* Change color on hover */
        text-decoration: underline; /* Underline on hover for better feedback */
        cursor: none;
    }

    button.active {
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        .lang-menu {
            width: auto;
            flex-direction: column; 
            align-items: flex-start; 
        }
    }
</style>