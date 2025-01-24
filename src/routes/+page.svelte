<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import HeroSection from './HeroSection.svelte';
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Aleksander Ekman | {$t('hPageTitle')}</title>
	<link rel="canonical" href="https://aleksanderekman.no" />
	<meta name="description" content="Aleksander's portfolio website with view over projects." />
</svelte:head>

<HeroSection />
