<script lang="ts">
	import { goto } from '$app/navigation';
	import { t, waitLocale } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let projectSection: HTMLElement;
	let images: { elvebakkenrevyen: string | null; ufc: string | null; vargrclan: string | null } = {
		elvebakkenrevyen: null,
		ufc: null,
		vargrclan: null
	};
	let visible = false;

	onMount(async () => {
        await waitLocale();
		visible = true;
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.01
		};

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					images.elvebakkenrevyen = (await import('$lib/assets/elvebakkenrevyen-web.webp')).default;
					images.ufc = (await import('$lib/assets/ufc-web.webp')).default;
					images.vargrclan = (await import('$lib/assets/vargrclan-web.webp')).default;
					observer.unobserve(entry.target);
				}
			});
		}, options);

		observer.observe(projectSection);
	});
</script>

<section class="project-section" bind:this={projectSection}>
	<h2>{$t('nav1')}</h2>
	<div class="project-list">
		<div class="project">
			{#if images.ufc}
				<img
					in:fade={{ duration: 350 }}
					id="project-img"
					src={images.ufc}
					alt="UFC website project"
				/>
			{:else}
				<div class="placeholder"></div>
			{/if}
			<h3>UFC Website</h3>
			<p>Project 2 description</p>
		</div>
		<div class="project">
			{#if images.elvebakkenrevyen}
				<img
					in:fade={{ duration: 350 }}
					id="project-img"
					src={images.elvebakkenrevyen}
					alt="Elvebakkenrevyen website project"
				/>
			{:else}
				<div class="placeholder"></div>
			{/if}
			<h3>Elvebakkenrevyen</h3>
			<p>Elvebakkenrevyen project description</p>
		</div>
		<div class="project">
			{#if images.vargrclan}
				<img
					in:fade={{ duration: 350 }}
					id="project-img"
					src={images.vargrclan}
					alt="Vikingtokt website project"
				/>
			{:else}
				<div class="placeholder"></div>
			{/if}
			<h3>Vargrclan</h3>
			<p>Project 3 description</p>
		</div>
	</div>

	<button onclick={() => goto('/projects')} class="btn-primary"
		>{#if visible}{$t(
				'pAction'
			)}{:else}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/if}</button
	>
</section>

<style>
	.project-section {
		box-shadow: 0 -3px 15px rgba(255, 255, 255, 0.2);
		background-color: #0a1828;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 60%);
		padding: 3rem 0rem;
		color: var(--text-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		min-height: 50rem;
		position: relative;
		text-transform: none;
		overflow: hidden;
		text-align: center;
		transition: background-image 1s ease-in-out;
	}

	.project-section h2 {
		font-family: var(--font-impact);
		font-size: 2.5rem;
		margin-bottom: 2rem;
	}

	.project-list {
		margin-bottom: 3rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		gap: 2rem;
		width: 100%;
	}

	.project {
		background-color: #0b1621;
		border-radius: 10px;
		box-shadow:
			0 4px 8px rgba(0, 0, 0, 0.2),
			0 0px 2px rgba(255, 255, 255, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 27.5rem;
		padding: 0rem;
		transition:
			transform 0.4s,
			box-shadow 0.4s;
		overflow: hidden;
	}
	.project p {
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.project:hover {
		transform: translateY(-10px) scale(1.025);
		box-shadow:
			0 8px 16px rgba(0, 0, 0, 0.3),
			0 0px 15px rgba(255, 255, 255, 0.4);
	}
	.project:hover img {
		transform: scale(1.05) translateY(2.5%);
	}
	.project img {
		aspect-ratio: 16/10;
		transition: transform 0.4s;
		width: 100%;
		height: auto;
		border-radius: 10px;
		margin-bottom: 1rem;
	}
	.placeholder {
		aspect-ratio: 16/10;
		width: 100%;
		height: auto;
		border-radius: 10px;
		margin-bottom: 1rem;
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.02) 50%,
			rgba(255, 255, 255, 0.04) 100%
		);
	}
	.project h3 {
        font-family: 'Montserrat';
		font-weight: 900;
		letter-spacing: 0.05rem;
		font-size: 1.4rem;
		margin-bottom: 0.5rem;
	}

	.project p {
		font-size: 1rem;
		color: #ccc;
	}

	.btn-primary {
		font-weight: bold;
		overflow: hidden;
		font-family: var(--font-header);
		font-size: 1rem;
		padding: 0 2rem;
		margin: 0;
		border-radius: 50px;
		height: 4rem;
		transition: transform 0.4s;
		background-color: var(--text-color);
		color: #0a1828;
	}

	.btn-primary:hover {
		cursor: none;
		transform: translateY(-4px);
	}
	@media (min-width: 1500px) {
		.project-section {
			height: 70rem;
		}
		.project img,
		.placeholder {
			margin-bottom: 2.5rem;
		}
		.project-list {
			gap: 5rem;
		}
		.project {
			width: 47rem;
		}
	}
	@media (max-width: 768px) {
		.project-section {
			padding: 2rem;
		}

		.project-list {
			gap: 4rem;
			flex-direction: column;
			align-items: center;
		}

		.project {
			width: 100%;
		}
		.btn-primary {
			margin: 1rem;
		}
	}
</style>
