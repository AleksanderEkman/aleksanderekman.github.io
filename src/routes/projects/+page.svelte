<script lang="ts">
	import { t } from 'svelte-i18n';
	import ProjectOverview from './ProjectOverview.svelte';
	export let data;
</script>

<svelte:head>
	<title>Aleksander Ekman - {$t('pPageTitle')}</title>
	<link rel="canonical" href="https://www.aleksanderekman.no/projects" />
</svelte:head>

<main>
	<ProjectOverview {data} />
</main>
