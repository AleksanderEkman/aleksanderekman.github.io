<script lang="ts">
	import { t } from 'svelte-i18n';
	import ParticleCanvas from './components/ParticleCanvas.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	let visible = false;

	let percentage = 45;
	let increment = -0.5;

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

<ParticleCanvas />
<section
	class="hero-section"
	style=""
>	
	<div class="gradient-overlay" style="background:
        radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 60%); background: radial-gradient(circle, rgb(15, 35, 55) 10%, rgba(4,20,35,0) {percentage}%);"></div>
	<div class="hero-section_content" class:visible>
		{#if visible}
			<h1 class="hero-section_title" transition:fade={{ delay: 200, duration: 1000 }}>
				<div class="font-impact">{$t('welcome')}</div>
				{$t('name')}
			</h1>
			<p class="hero-section_description" transition:fade={{ delay: 500, duration: 1000 }}>
				{$t('desc')}
			</p>
			<div class="hero-section_cta" transition:fade={{ delay: 800, duration: 1000 }}>
				<button onclick={() => goto('/projects')} class="btn btn-primary">{$t('work')}</button>
				<button onclick={() => goto('/contact')} class="btn btn-secondary">{$t('contact')}</button>
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
		color: #ffffff;
		padding: 2rem;
		font-family: var(--font-header);
	}
	.gradient-overlay {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 2;
	}
	.hero-section_content {
		z-index: 2;
		text-align: left;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
	}

	.hero-section_content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.font-impact {
		font-family: var(--font-impact);
		line-height: 0;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
	}
	.hero-section_title {
		text-wrap: nowrap;
		line-height: 200%;
		font-size: 3.5rem;
		color: var(--text-color);
	}

	.hero-section_description {
		text-wrap: nowrap;
		text-align: center;
		font-size: 1.5rem; /* Increased size for emphasis */
		margin-bottom: 2rem;
		color: #178582;
		font-weight: bold;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Add shadow for emphasis */
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
		font-size: 1.2rem;
		padding: 0.75rem 1.5rem;
		border-radius: 50px;
		text-decoration: none;
		font-weight: bold;
		transition:
			background-color 0.3s ease,
			transform 0.3s ease;
	}
	.btn:active {
		cursor: none !important;
	}
	.btn:hover {
		transform: translateY(-4px);
	}

	.btn-primary {
		background-color: var(--text-color);
		color: #0a1828;
	}

	.btn-primary:hover {
		background-color: #b49d84;
		cursor: none;
	}
	.btn-primary:active {
		background-color: rgb(122, 105, 88);
		transform: scale(0.95) translateY(-7.5%);
	}
	.btn-secondary {
		background-color: transparent;
		color: var(--text-color);
		border: 2px solid var(--text-color);
	}

	.btn-secondary:hover {
		background-color: rgba(191, 161, 129, 0.1);
		cursor: none;
	}
	.btn-secondary:active {
		transform: scale(0.95) translateY(-7.5%);
	}
	@media (max-width: 1024px) {
		.hero-section {
			height: 100lvh;
		}
		.hero-section_title {
			font-size: 2.25rem;
		}
		.hero-section_content {
			text-align: center;
			display: flex;
			flex-direction: column;
		}
		.hero-section_description {
			line-height: auto;
			font-size: 1rem;
			text-wrap: wrap;
		}

		.hero-section_cta {
			flex-direction: column;
			align-items: center;
		}
		.btn {
			width: 60%;
			font-size: 1rem;
		}
	}

	@media (max-width: 540px) {
		.hero-section_title {
			font-size: 2.1rem;
		}
	}

	@media (max-width: 1024px) and (orientation: landscape) {
		.hero-section_content {
			margin-top: 3rem;
		}
		.hero-section_title {
			font-size: 3.25vw;
		}
		.hero-section {
			height: 100svh;
		}
	}
	@media (max-width: 540px) {
		.hero-section {
			height: 100svh;
		}
	}
</style>
