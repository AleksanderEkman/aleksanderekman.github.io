<script lang="ts">
    import ParticleCanvas from "./components/ParticleCanvas.svelte";
    import { t } from "svelte-i18n";
    import { onMount } from "svelte";
	import { goto } from "$app/navigation";
    let visible = false;

    onMount(() => {
        visible = true;
    });
</script>

<ParticleCanvas />
<section class="error-section">
    <div class="error-section_content" class:visible>
        <h1 class="error-section_title">
            <div class="font-impact">404</div>
        </h1>
        <p>{$t('error.notFound')}</p>
        <button class="btn" onclick={() => goto('/')}>{$t('error.backHome')}</button>
    </div>
</section>

<style>
    :global(.error-section_content.visible) {
        opacity: 1 !important;
        transform: translateY(0);
    }

    .font-impact {
        font-family: var(--font-impact);
        line-height: 200%;
    }
    .error-section {
        height: 100svh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
        padding: 2rem;
        font-family: var(--font-header);
    }

    .error-section_content {
        text-align: center;
        max-width: 800px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .error-section_content p {
        font-size: 1.75rem; 
        margin-bottom: 2rem;
        color: #178582; 
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.7); /* Add shadow for emphasis */
        font-family: var(--font-header);
    }
    .error-section_title {
        line-height: 200%;
        font-size: 4.5rem;
        margin-bottom: 0.5rem;
        color: #c9af93;
    }
    .btn:hover {
        cursor: none;
        background-color: rgba(191, 161, 129, 0.1);
        transform: translateY(-4px);
    }  
    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s ease, transform 0.3s ease;
        background-color: transparent;
        color: #BFA181;
        border: 2px solid #BFA181;
    }
</style>
