<script lang="ts">
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import LanguageToggle from './components/LanguageToggle.svelte';
	import { page } from '$app/state';
	import { t } from 'svelte-i18n';
	import { waitLocale } from 'svelte-i18n';
	import { onMount } from 'svelte';

	let translationReady = false;
	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	onMount(async () => {
		await waitLocale();
		translationReady = true;
	});
</script>

<header>
	<nav aria-label="Main navigation">
		<ul role="menubar">
			{#if translationReady}
				<li role="menuitem" in:fade={{ duration: 200 }}>
					<button
						onclick={() => goto(`/`)}
						tabindex="0"
						class="name"
						aria-label="Home page"
						title={$t('nav0')}
					>
						<img src="/favicon.png" alt="" />
						<h1>
							Aleksander<strong>Ekman</strong>
						</h1>
					</button>
				</li>

				<div class="desktop" in:fade={{ duration: 200 }}>
					<div class="right">
						<div class="side-menu">
							<li role="menuitem" class:active={page.url.pathname === '/projects'}>
								<button
									onclick={() => goto(`/projects`)}
									tabindex="0"
									aria-label="View Projects"
									title={$t('nav1')}
								>
									{$t('nav1')}
								</button>
							</li>
							<li role="menuitem" class:active={page.url.pathname === '/about-me'}>
								<button
									onclick={() => goto(`/about-me`)}
									tabindex="0"
									aria-label="View about page"
									title={$t('nav2')}
								>
									{$t('nav2')}
								</button>
							</li>
							<li role="menuitem" class:active={page.url.pathname === '/contact'}>
								<button
									onclick={() => goto(`/contact`)}
									tabindex="0"
									aria-label="Contact me"
									title={$t('nav3')}
								>
									{$t('nav3')}
								</button>
							</li>
						</div>
						<LanguageToggle />
					</div>
				</div>
			{/if}
			<div role="menuitem" id="unset">
				<button id="menu-button" aria-label="Åpne meny" onclick={toggleMobileMenu}>
					<svg class:open={mobileMenuOpen} width="100" height="100" viewBox="0 0 100 100">
						<path class="line top" d="M 20,30 H 80" />
						<path class="line middle" d="M 20,50 H 80" />
						<path class="line bottom" d="M 20,70 H 80" />
					</svg>
				</button>
			</div>
		</ul>
	</nav>
</header>
{#if mobileMenuOpen}
	<div in:fade={{ duration: 150 }} class="overlay"></div>
{/if}
<aside class="mobile">
	{#if mobileMenuOpen}
		<ul class="mobile-menu" in:fade={{ duration: 250 }} out:fade={{ duration: 250 }}>
			<li role="menuitem">
				<a
					href="/projects"
					onclick={() => {
						setTimeout(toggleMobileMenu, 150);
					}}
					>{$t('nav1')}
				</a>
			</li>
			<li role="menuitem">
				<a
					href="/about"
					onclick={() => {
						setTimeout(toggleMobileMenu, 150);
					}}
					>{$t('nav2')}
				</a>
			</li>
			<li role="menuitem">
				<a
					href="/contact"
					onclick={() => {
						setTimeout(toggleMobileMenu, 150);
					}}
					>{$t('nav3')}
				</a>
			</li>
			<LanguageToggle />
		</ul>
	{/if}
</aside>

<style>
	#unset {
		display: none;
	}
	header {
		user-select: none;
		border-radius: 0 0 25px 25px;
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
		color: var(--text-color);
		touch-action: manipulation;
	}

	nav {
		width: 100vw;
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
	}

	li {
		text-wrap: nowrap;
		margin: 0 2rem 0 2rem;
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
	.side-menu li:hover {
		transition:
			transform 0.3s ease,
			color 0.3s ease;
	}
	li:hover::after {
		width: 100%;
	}
	li.active::after {
		width: 100%;
	}
	li.active {
		color: white;
		text-shadow:
			0 0 5px black,
			0 0 10px black;
	}
	button {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100%;
		color: var(--color-text);
		font-size: 1.3rem;
		letter-spacing: 0.03em;
		background: none;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: var(--font-header);
	}
	button img {
		width: 2rem;
		height: 2rem;
		margin-right: 0.5rem;
	}

	button:hover {
		cursor: none;
		color: white;
		text-shadow:
			0 0 5px black,
			0 0 10px black;
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
		text-shadow:
			0.5px 0 0 currentColor,
			-0.5px 0 0 currentColor,
			0 0.5px 0 currentColor,
			0 -0.5px 0 currentColor;
	}

	button:hover::after,
	button:focus::after {
		width: 100%;
	}

	.mobile {
		display: none;
	}

	@media (max-width: 1055px) {
		.desktop {
			display: none;
		}
		nav button {
			font-size: 1rem;
			padding: 0;
			margin-right: 1rem;
		}
		nav {
			justify-content: center;
		}
		ul {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		nav button.name {
			font-size: 1.4rem;
		}
		.mobile {
			display: flex;
			align-items: center;
		}
		#menu-button {
			display: flex;
			align-self: center;
			position: absolute;
			z-index: 1001;
			width: 2.5rem;
			height: 2.5rem;
			right: 0;
		}
		.line {
			stroke-width: 8;
			stroke-linecap: round;
			stroke: var(--text-color);
			transition: all 200ms;
		}
		.top {
			transform-origin: 26px 40px;
		}

		.middle {
			stroke-dasharray: 60 60;
		}

		.bottom {
			transform-origin: 26px 60px;
		}
		.open .top {
			transform: rotate(45deg);
		}
		.open .middle {
			opacity: 0;
		}
		.open .bottom {
			transform: rotate(-45deg);
		}
		.mobile {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.mobile-menu {
			top: 5rem;
			color: var(--text-color);
			width: 80vw;
			position: fixed;
			background-color: rgba(10, 24, 40, 0.5);
			backdrop-filter: blur(15px);
			border-radius: 15px;
			z-index: 1000;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 4rem 0 4rem 0;
			margin: 0;
			height: auto;
			border: 1px solid rgba(0, 0, 0, 0.4);
			touch-action: manipulation;
		}
		.mobile-menu li {
			padding: 0.5rem 4rem 0.5rem 4rem;
			margin: 0.5rem 0;
			font-size: 1rcap;
			border-radius: 10px;
		}
		.mobile-menu a {
			font-size: 1.2rem;
			padding: 0.5rem 1rem;
		}
		.mobile-menu li:active,
		.mobile-menu li:hover,
		.mobile-menu li:focus {
			background-color: rgba(0, 0, 0, 0.1);
		}
		.overlay {
			user-select: none;
			z-index: 1;
			position: fixed;
			top: 0;
			left: 0;
			background: rgb(0, 0, 0);
			background: linear-gradient(
				180deg,
				rgba(3, 8, 14, 0.8) 0%,
				rgba(3, 8, 14, 0.5) 80%,
				rgba(3, 8, 14, 0) 100%
			);
			width: 100vw;
			height: 80%;
		}
		#unset {
			all: unset;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}
	}
	@media (max-width: 1024px) and (orientation: landscape) {
		.mobile-menu {
			top: 1rem;
			padding: 1rem 0 1rem 0;
			width: 60vw;
		}
		.mobile-menu li {
			padding: 0.25rem 2rem 0.25rem 2rem;
		}
	}
</style>
