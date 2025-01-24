<script lang="ts">
	import { setupI18n } from '$lib/i18n/index';
	setupI18n();
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { initGoogleAnalytics } from '$lib/googleAnalytics';

	export let children: import('svelte').Snippet;
	const timeoutMap = new Map();
	const moveCursor = (cursor: HTMLElement, e: MouseEvent) => {
		cursor.style.opacity = '1';
		cursor.style.top = e.clientY + 'px';
		cursor.style.left = e.clientX + 'px';
		cursor.classList.add('glow');

		if (timeoutMap.has(cursor)) {
			clearTimeout(timeoutMap.get(cursor));
		}

		const timeoutId = setTimeout(() => {
			cursor.classList.remove('glow');
			timeoutMap.delete(cursor);
		}, 150);

		timeoutMap.set(cursor, timeoutId);
	};

	onMount(() => {
		initGoogleAnalytics();
		document.body.style.cursor = 'none';
		const cursor = document.querySelector('.mouse-cursor') as HTMLElement;
		if (!cursor) return;

		document.addEventListener('mousemove', (e) => {
			moveCursor(cursor, e);
		});

		document.addEventListener('mousedown', () => {
			cursor.classList.add('click');
		});
		document.addEventListener('mouseup', () => {
			cursor.classList.remove('click');
		});
		document.addEventListener('mouseenter', () => {
			cursor.style.opacity = '1';
		});
		document.addEventListener('mouseleave', () => {
			cursor.style.opacity = '0';
		});
		return () => {
			document.removeEventListener('mousemove', () => {});
			document.removeEventListener('mouseenter', () => {});
			document.removeEventListener('mouseleave', () => {});
			document.removeEventListener('mousedown', () => {});
			document.removeEventListener('mouseup', () => {});
		};
	});
</script>

<div class="app">
	<Header />
	<main>
		{@render children?.()}
	</main>
	<Footer />
</div>

<div class="mouse-cursor"></div>

<!-- Ensure this div is present -->

<style>
	:global(.mouse-cursor) {
		display: flex;
		opacity: 0;
		position: fixed;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.8);
		pointer-events: none;
		z-index: 9999;
		mix-blend-mode: difference;
		transition:
			box-shadow 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
			opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
			transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		transform: translate(-50%, -50%);
	}
	:global(img:hover + .mouse-cursor) {
        mix-blend-mode: normal !important;
    }

	:global(.mouse-cursor::after) {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 3px solid rgba(255, 255, 255, 0.5);
		animation: pulse 2s infinite;
	}

	:global(.mouse-cursor.glow) {
		opacity: 1;
		box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.5);
	}

	:global(.mouse-cursor.click) {
		transform: translate(-50%, -50%) scale(1.25);
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.7);
	}
	:global(.trail) {
		position: fixed;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.5); /* Customize the color and opacity as needed */
		pointer-events: none;
		z-index: 9998; /* Behind the main cursor */
		transform: translate(-50%, -50%) scale(0.8); /* Center and scale the cursor */
		transition: all 0.1s ease-out; /* Smooth transitions */
		animation: fade 1s forwards; /* Fade effect */
	}
	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.8);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.app {
		cursor: none;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		overflow-x: hidden;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	@media (max-width: 930px) {
		:global(.mouse-cursor) {
			display: none;
		}
	}
	@media (max-width: 1024px) and (orientation: landscape) {
		:global(.mouse-cursor) {
			display: none;
		}
	}
</style>
