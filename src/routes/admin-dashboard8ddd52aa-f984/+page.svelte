<script lang="ts">
    import { onMount } from 'svelte';
    import AdminDashboard from './AdminDashboard.svelte';

    export let data;
</script>

<svelte:head>
    <title>Aleksander Ekman - Admin Dashboard</title>
</svelte:head>


<main>
    <AdminDashboard {data} />
</main>