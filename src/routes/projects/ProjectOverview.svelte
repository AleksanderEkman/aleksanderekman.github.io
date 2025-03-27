<script lang="ts">
    import { onMount } from "svelte";
    export let data;
    let projects = data.projectsWithImages;
</script>

<div class="project-overview">
    {#each projects as project}
        <div class="project">
            <h1>{project.project_name}</h1>
            <p>{project.project_desc}</p>
            <p>{project.project_body}</p>
            {#each project.images as image}
                <img src={image} alt="project" />
            {/each}
        </div>
    {/each}
</div>

<style>
    .project-overview {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
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