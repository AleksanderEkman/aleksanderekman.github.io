<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import LanguageToggle from './components/LanguageToggle.svelte';
    import { t } from 'svelte-i18n';

</script>

<header>
    <nav aria-label='Main navigation'>
        <ul role="menubar">
            <li role="menuitem">
                <button onclick={() => goto(`/`)} 
                    tabindex="0" class='name' 
                    aria-label='Home page' title="Portfolio website front page" 
                    aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
                    Aleksander<strong>Ekman</strong>
                </button>
            </li>
            <div class="right">
                <div class="side-menu">
                    <li role="menuitem">
                        <button onclick={() => goto(`/projects`)}
                            tabindex="0" aria-label="View Projects"
                            title="Projects">
                            {$t('nav1')}
                        </button>
                    </li>
                    <li role="menuitem">
                        <button onclick={() => goto(`/about`)}
                            tabindex="0" aria-label="View about page"
                            title="About Page">
                            {$t('nav2')}
                        </button>
                    </li>
                    <li role="menuitem">
                        <button onclick={() => goto(`/about`)}
                            tabindex="0" aria-label="Contact me"
                            title="Contact Page">
                            {$t('nav3')}
                        </button>
                    </li>
                </div>
                <LanguageToggle />
            </div>
        </ul>
    </nav>
</header>

<style>
    header {
        padding: 0.3rem 0 0.3rem 0; 
        display: flex;
        justify-content: center;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        box-shadow: 0 0.5px 0.5px rgba(0, 0, 0, 0.1);
        background-color: #0A1828;
        color: #d9c7b3;
    }

    nav {
        width: 95%;
        display: flex;
        justify-content: space-between;
    }

    ul {
        width: 100%;
        padding: 0; /* Ensure no padding */
        margin: 0; /* Ensure no margin */
        height: 3.6rem; /* Consistent height */
        display: flex;
        justify-content: space-between;
        align-items: center; /* Center items vertically */
        list-style: none;
    }

    li {
        margin: 0 5rem 0 5rem;
        display: flex;
        align-items: center; /* Center items vertically */
    }

    button {
        height: 100%; /* Ensure buttons take full height */
        color: var(--color-text);
        font-size: 1.3rem;
        letter-spacing: 0.05em;
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: var(--font-header);
    }
    button:hover {
        cursor: none;
    }
    nav button.name {
        font-size: 2rem; /* Larger font size for the name */
    }

    /* Adjustments for side menu */
    .side-menu {
        display: flex;
        justify-content: space-between; 
    }

    /* Adjustments for right section */
    .right {
        display: flex;
        align-items: center; /* Center items vertically */
    }

    strong {
        text-shadow: 0.5px 0 0 currentColor, -0.5px 0 0 currentColor, 
                    0 0.5px 0 currentColor, 0 -0.5px 0 currentColor;
    }

    /* Hover and focus styles */
    button:hover,
    button:focus {
        color: var(--color-theme-1);
    }

    button:hover::after,
    button:focus::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        nav button {
            font-size: 1rem; /* Adjust font size for smaller screens */
            padding: 0; /* Remove padding for smaller screens */
            margin-right: 1rem; /* Add some spacing between buttons */
        }

        .right {
            width: auto; /* Allow right section to adjust based on content */
            justify-content: center; /* Center the right section on small screens */
            gap: 1rem; /* Add gap between language toggle and buttons */
        }
    }

</style>