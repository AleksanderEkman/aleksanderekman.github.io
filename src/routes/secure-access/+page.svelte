<script lang="ts">
	import { onMount } from 'svelte';
	import LogIn from './LogIn.svelte';
	
	export let data;
</script>

<svelte:head>
	<title>Aleksander Ekman - Logg Inn</title>
</svelte:head>

<main>
	<LogIn {data} />
</main>

