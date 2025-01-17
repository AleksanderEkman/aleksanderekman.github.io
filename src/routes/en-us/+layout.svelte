<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { onMount } from 'svelte';
	import '../../app.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const moveCursor = (cursor: HTMLElement, e: MouseEvent) => {
		cursor.style.opacity = '1';
			cursor.style.top = e.pageY + 'px';
			cursor.style.left = e.pageX + 'px';
			cursor.classList.add('glow');

			clearTimeout(cursor.timeoutId);
			cursor.timeoutId = setTimeout(() => {
				cursor.classList.remove('glow');
			}, 150);
	}

	const cursorClick = (cursor: HTMLElement) => {
		cursor.classList.add('click');
		setTimeout(() => {
			cursor.classList.remove('click');
		}, 75);
	}

	onMount(() => {
		const cursor = document.querySelector('.mouse-cursor') as HTMLElement;
		if (!cursor) return;

		document.addEventListener('mousemove', (e) => {
			moveCursor(cursor, e);
		});
	
		document.addEventListener('click', () => {
			cursorClick(cursor);
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

<div class="mouse-cursor"></div> <!-- Ensure this div is present -->

<style>
	:global(.mouse-cursor) {
		display: flex;

		opacity: 0;
		position: fixed;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background-color: #fff; /* Customize the color as needed */
		pointer-events: none;
		z-index: 9999;

		box-shadow: 0 0 0 0 rgb(255, 255, 255); /* Customize the color as needed */
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1); /* Smooth transitions */
	}
	
	:global(.mouse-cursor.glow) {
		opacity: 1;
		box-shadow: 0px 0 7px 3px rgb(255, 255, 255); /* Customize the color as needed */
	}

	:global(.mouse-cursor.click) {
		transform: scale(1.3);
		box-shadow: 1px 0 4px 2px rgb(255, 255, 255);
	}
	
	.app {
		cursor: none; /* Hide the default cursor */
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>
