<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
    let percentage = 45;
    let increment = -0.5;
    let visible = false;

    function updateGradient() {
        percentage += increment;
        if (percentage <= 22 || percentage >= 45) {
            increment *= -1;
        }
    }
    setInterval(updateGradient, 100);
    onMount(() => {
        visible = true;
    });
</script>

<section class="hero-section" style="background: radial-gradient(circle, rgb(15, 35, 55) 10%, rgba(4,20,35) {percentage}%);">
    <div class="hero-section_content" class:visible>
        {#if visible}
            <h1 class="hero-section_title" transition:fade={{ delay: 300, duration: 1000 }}>
                <div class="font-impact">Welcome,</div> my name is Aleksander
            </h1>
            <p class="hero-section_description" transition:fade={{ delay: 600, duration: 1000 }}>Fullstack Developer | Design and Web Development | I.T. Student</p>
            <div class="hero-section_cta" transition:fade={{ delay: 900, duration: 1000 }}>
                <a href="/en-us/projects" class="btn btn-primary">View My Work</a>
                <a href="/en-us/contact" class="btn btn-secondary">Get in Touch</a>
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
        color: #FFFFFF;
        padding: 2rem;
        font-family: var(--font-header);
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
        color: #c9af93;
    }

    .hero-section_description {
        text-align: center;
        font-size: 1.5rem; /* Increased size for emphasis */
        margin-bottom: 2rem;
        color: #178582; 
        font-weight: bold; /* Make text bold */
        text-shadow: 1px 1px 2px rgba(0,0,0,0.7); /* Add shadow for emphasis */
        font-family: var(--font-header);
    }

    .hero-section_cta {
        justify-self: flex-start;
        font-family: var(--font-header);
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
        background-color: #c9af93;
        color: #0A1828;
    }

    .btn-primary:hover {
        background-color: #c9af93;
        cursor: none;
    }

    .btn-secondary {
        background-color: transparent;
        color: #BFA181;
        border: 2px solid #BFA181;
    }

    .btn-secondary:hover {
        background-color: rgba(191, 161, 129, 0.1);
        cursor: none;
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
