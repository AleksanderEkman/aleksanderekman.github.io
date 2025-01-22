<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import HeroSection from './HeroSection.svelte';
</script>

<svelte:head>
	<title>Aleksander Ekman: Fullstack Developer Portfolio</title>
	<meta name="description" content="Aleksander's portfolio website with view over projects." />
</svelte:head>

<HeroSection />
