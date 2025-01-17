<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
    
    let visible = false;

    onMount(() => {
        visible = true;
    });
</script>

<section class="hero-section">
    <div class="hero-section_content" class:visible>
        {#if visible}
            <h1 class="hero-section_title" transition:fade={{ delay: 300, duration: 1000 }}>
                <div class="font-impact">Welcome,</div> my name is Aleksander
            </h1>
            <p class="hero-section_description" transition:fade={{ delay: 600, duration: 1000 }}>Fullstack, design & web development, I.T. Student</p>
            <div class="hero-section_cta" transition:fade={{ delay: 900, duration: 1000 }}>
                <a href="#projects" class="btn btn-primary">View My Work</a>
                <a href="#contact" class="btn btn-secondary">Get in Touch</a>
            </div>
        {/if}
    </div>
</section>

<style>
    .hero-section {
        height: 100svh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: radial-gradient(circle, rgb(13, 32, 55) 10%, rgba(10,24,40,1) 42%);
        color: #FFFFFF;
        padding: 2rem;
    }

    .hero-section_content {
        text-align: left;
        max-width: 800px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .hero-section_content.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .font-impact {
        font-family: var(--font-impact);
        line-height: 0;
    }
    .hero-section_title {
        line-height: 200%;
        font-size: 3.5rem;
        margin-bottom: 0.5rem;
        color: #BFA181;
    }

    .hero-section_description {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        color: #178582;
    }

    .hero-section_cta {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .btn:hover {
        transform: translateY(-2px);
    }

    .btn-primary {
        background-color: #BFA181;
        color: #0A1828;
    }

    .btn-primary:hover {
        background-color: #d4b797;
    }

    .btn-secondary {
        background-color: transparent;
        color: #BFA181;
        border: 2px solid #BFA181;
    }

    .btn-secondary:hover {
        background-color: rgba(191, 161, 129, 0.1);
    }

    @media (max-width: 768px) {
        .hero-section_title {
            font-size: 2.5rem;
        }

        .hero-section_description {
            font-size: 1rem;
        }

        .hero-section_cta {
            flex-direction: column;
        }
    }
</style>
