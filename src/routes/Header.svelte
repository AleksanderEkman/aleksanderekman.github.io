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
                            {$t('nav1') || 'Projects'}
                        </button>
                    </li>
                    <li role="menuitem">
                        <button onclick={() => goto(`/about`)}
                            tabindex="0" aria-label="View about page"
                            title="About Page">
                            {$t('nav2') || 'About Me'}
                        </button>
                    </li>
                    <li role="menuitem">
                        <button onclick={() => goto(`/about`)}
                            tabindex="0" aria-label="Contact me"
                            title="Contact Page">
                            {$t('nav3') || 'Contact'}
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
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        background-color: rgba(10, 24, 40, 0.5);
        backdrop-filter: blur(10px);
        color: #d9c7b3;
    }

    nav {
        width: 95%;
        display: flex;
        justify-content: space-evenly;
    }

    ul {
        width: 100%;
        padding: 0;
        margin: 0;
        height: 3.6rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        list-style: none;
    }

    li {
        margin: 0 2.5rem 0 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    li::after {
        content: '';
        display: block;
        width: 0;
        height: 2px;
        background: white;
        transition: width 0.3s;
    }
    li:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease, color 0.3s ease;
        color: var(--color-theme-1);
    }
    li:hover::after {
        width: 100%;
    }

    button {
        height: 100%;
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
        color: white;
        text-shadow: 0 0 5px black, 0 0 10px black;
    }

    nav button.name {
        font-size: 2rem;
    }

    .side-menu {
        display: flex;
        justify-content: space-between;
    }

    .right {
        display: flex;
        align-items: center;
    }

    strong {
        text-shadow: 0.5px 0 0 currentColor, -0.5px 0 0 currentColor,
                    0 0.5px 0 currentColor, 0 -0.5px 0 currentColor;
    }

    button:hover::after,
    button:focus::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        nav button {
            font-size: 1rem;
            padding: 0;
            margin-right: 1rem;
        }

        .right {
            width: auto;
            justify-content: center;
            gap: 1rem;
        }
    }
</style>
