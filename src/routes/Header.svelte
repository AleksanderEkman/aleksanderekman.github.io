<script lang="ts">
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    // Navbar navigation for accessibility
    onMount(() => {
        const menuItems = document.querySelectorAll('nav ul li button');
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', (e: Event) => {
                const keyboardEvent = e as KeyboardEvent;
                if (keyboardEvent.key === 'ArrowRight') {
                    e.preventDefault();
                    (menuItems[(index + 1) % menuItems.length] as HTMLElement).focus();
                } else if (keyboardEvent.key === 'ArrowLeft') {
                    e.preventDefault();
                    (menuItems[(index - 1 + menuItems.length) % menuItems.length] as HTMLElement).focus();
                }
                if (keyboardEvent.key === 'Home') {
                    e.preventDefault();
                    (menuItems[0] as HTMLElement).focus();
                } else if (keyboardEvent.key === 'End') {
                    e.preventDefault();
                    (menuItems[menuItems.length - 1] as HTMLElement).focus();
                }
            });
        });
    });
</script>

<header>
    <nav aria-label='Main navigation'>
        <ul role="menubar">
            <li role="menuitem">
                <button on:click={() => goto(`${base}/events`)} tabindex="0" aria-label="View UFC Events" title="UFC Events" aria-current={$page.url.pathname === '/events' ? 'page' : undefined}>Events</button>
            </li>
            <li role="menuitem">
                <button on:click={() => goto(`${base}/`)} tabindex="0" class='logo' aria-label='UFC Home' title="Ultimate Fighting Championship Home" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>UFC</button>
            </li>
            <li role="menuitem">
                <button on:click={() => goto(`${base}/athletes`)} tabindex="0" aria-label="View UFC athletes" title="Athletes Page" aria-current={$page.url.pathname === '/athletes' ? 'page' : undefined}>Athletes</button>
            </li>
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
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background: linear-gradient(to right, #0b0b16, #0f172c);
    }

    nav {
        width: 75%;
        display: flex;
        justify-content: center;
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
        background: var(--background);
    }

    li {
        display: flex;
        align-items: center;
        height: 100%;
        position: relative;
    }

    nav button {
        padding: 0 1.5rem;
        text-shadow: 0.3077em 0.3077em 0.6154em #000000;
        display: flex;
        height: 100%;
        align-items: center;
        color: #ffffff;
        font-weight: 700;
        font-size: 1.3rem;
        text-transform: uppercase;
        letter-spacing: 0.075em;
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
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

    nav button.logo {
        display: flex;
        justify-self: center;
        font-family: var(--font-header);
        font-size: 2.5rem;
        padding: 0 0rem;
        background: linear-gradient(45deg, #ff4e50, #f9d423);
        text-shadow: 0em 0em 10em currentColor;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
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
        nav button, nav button::after {
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

        nav button.logo {
            font-size: 2rem;
        }
        nav {
            width: 100%;
        }
    }
</style>