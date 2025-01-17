<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import LanguageToggle from './components/LanguageToggle.svelte';

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
                            Projects
                        </button>
                    </li>
                    <li role="menuitem">
                        <button onclick={() => goto(`/about`)}
                            tabindex="0" aria-label="View about page"
                            title="About Page">
                            About
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
        padding: 0;
        margin: 0;
        height: 3.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        background: var(--background);
    }

    li {
        display: flex;
        align-items: center;
        height: 100%;
        position: relative;
    }
    button:hover {
        cursor: none;
    }
    nav button {
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

    nav button::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 3px;
        background: var(--color-theme-1);
        transition: all 0.3s ease;
    }

    nav button:hover::after,
    nav button:focus::after {
        width: 100%;
        left: 0;
    }

    .side-menu {
        display: flex;
        justify-content: space-between;
        width: 60%;
    }

    .right {
        display: flex;
        justify-content: space-between;
        width: 30%;
    }

    nav button.name {
        display: flex;
        justify-self: center;
        font-size: 2rem;
        padding: 0;
    }

    strong {
        text-shadow: 0.5px 0 0 currentColor, -0.5px 0 0 currentColor, 0 0.5px 0 currentColor, 0 -0.5px 0 currentColor;
    }

    button:hover,
    button:focus {
        color: var(--color-theme-1);
    }

    button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(var(--color-theme-1-rgb), 0.5);
    }

    @media (prefers-reduced-motion: reduce) {
        nav button,
        nav button::after {
            transition: none;
        }
    }

    @media (max-width: 768px) {
        ul {
            justify-content: center;
        }

        nav button {
            font-size: 1rem;
            padding: 0 1rem;
        }

        nav button.name {
            font-size: 2rem;
        }

        nav {
            width: 100%;
        }

        .right {
            width: 50%;
        }
    }
</style>