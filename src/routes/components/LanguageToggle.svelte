<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { language } from '$lib/stores/language';
	import { browser } from '$app/environment';

	let currentLocale: string;

	language.subscribe((value) => {
		currentLocale = value;
	});
	const changeLanguage = (lang: string) => {
		locale.set(lang);
		currentLocale = lang;
		if (browser) {
			localStorage.setItem('language', lang);
		}
	};
</script>

<div class="lang-menu" role="menubar" aria-label="Language selection">
	<button
		id="no-button"
		class:active={currentLocale === 'no'}
		onclick={() => changeLanguage('no')}
		tabindex="0"
		aria-label="Select Norwegian language"
		title="Norwegian Language"
		aria-current={currentLocale === 'no' ? 'true' : undefined}
	>
		NO
	</button>
	<button
		id="en-button"
		class:active={currentLocale === 'en-US'}
		onclick={() => changeLanguage('en-US')}
		tabindex="0"
		aria-label="Select English language"
		title="English Language"
		aria-current={currentLocale === 'en-US' ? 'true' : undefined}
	>
		EN
	</button>
</div>

<style>
	.lang-menu {
		position: relative;
		margin-left: 2rem;
		display: flex;
		gap: 0.5rem;
		font-size: 1.3rem;
		padding: 0.5rem;
		border-radius: 10px;
		box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
	}
	button {
		position: relative;
		background: transparent;
		border: none;
		cursor: pointer;
		transition:
			color 0.3s ease,
			text-decoration 0.3s ease; /* Smooth transition */
		padding: 0.5rem; /* Added padding for better touch target */
	}
	button.active {
		font-weight: bold; /* Make active button more prominent */
	}
	button.active::after {
		width: 100%;
	}
	button:hover {
		color: #ffffff;
		cursor: none;
	}
	button::after {
		content: '';
		display: flex;
		justify-self: center;
		width: 0;
		height: 2px;
		background: #b3a494;
		transition: width 0.3s ease;
	}
	button:hover::after {
		width: 100%;
	}

	@media (max-width: 1055px) {
		.lang-menu {
			width: auto;
			margin-left: 0;
			font-size: 1.2rem;
		}
	}
</style>
