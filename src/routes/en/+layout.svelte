<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="app">
	<Header />
	<main>
		{@render children?.()}
	</main>
	<Footer />
</div>

<style>
	.app {
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

