<script lang="ts">
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    import { onMount } from 'svelte';
    import HeroSection from './HeroSection.svelte';

    onMount(() => {
        
    });
</script>

<svelte:head>   
    <title>Aleksander's Portfolio</title>
    <meta name="description" content="Aleksander's portfolio website with view over projects."/>
</svelte:head>

<HeroSection />

