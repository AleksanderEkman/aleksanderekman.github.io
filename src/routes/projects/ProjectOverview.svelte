<script lang="ts">
    import { onMount } from "svelte";
    export let data;
    console.log(data);
</script>

<div class="project-overview">
    {#each data.projects as project}
        <div class="project">
            <h1>{project.project_name}</h1>
            <p>{project.project_desc}</p>
            <p>{project.project_body}</p>
        </div>
    {/each}
</div>

<style>
    .project-overview {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100vh;
        z-index: 5;
        gap: 2rem;
    }
    .project {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        z-index: 5;
    }
</style>