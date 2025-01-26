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
	$: projects = [
		{
			name: $t('project1'),
			image: images.ufc,
			description: $t('project1desc'),
			tech: [
				{ name: 'GitHub Pages', icon: 'github/github-original.svg' },
				{ name: 'Vercel', icon: 'vercel/vercel-original.svg' },
				{ name: 'SvelteKit', icon: 'svelte/svelte-original.svg' },
				{ name: 'TypeScript', icon: 'typescript/typescript-plain.svg' },
				{ name: 'HTML5', icon: 'html5/html5-plain.svg' },
				{ name: 'CSS3', icon: 'css3/css3-plain.svg' }
			]
		},
		{
			name: $t('project2'),
			image: images.elvebakkenrevyen,
			description: $t('project2desc'),
			tech: [
				{ name: 'DigitalOcean', icon: 'digitalocean/digitalocean-original.svg' },
				{ name: 'Docker', icon: 'docker/docker-plain.svg' },
				{ name: 'Node.js', icon: 'nodejs/nodejs-original.svg' },
				{ name: 'SvelteKit', icon: 'svelte/svelte-original.svg' },
				{ name: 'TypeScript', icon: 'typescript/typescript-plain.svg' },
				{ name: 'HTML5', icon: 'html5/html5-plain.svg' },
				{ name: 'CSS3', icon: 'css3/css3-plain.svg' }
			]
		},
		{
			name: $t('project3'),
			image: images.vargrclan,
			description: $t('project3desc'),
			tech: [
				{ name: 'GitHub Pages', icon: 'github/github-original.svg' },
				{ name: 'SvelteKit', icon: 'svelte/svelte-original.svg' },
				{ name: 'TypeScript', icon: 'typescript/typescript-plain.svg' },
				{ name: 'HTML5', icon: 'html5/html5-plain.svg' },
				{ name: 'CSS3', icon: 'css3/css3-plain.svg' }
			]
		}
	];

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
	{#if visible}
		<h2>{$t('nav1')}</h2>
	{:else}
		<span id="pst">&nbsp;</span>
	{/if}
	<div class="project-list">
		{#each projects as project}
			<div class="project">
				{#if project.image}
					<img
						in:fade={{ duration: 350 }}
						id="project-img"
						src={project.image}
						alt="{project.name} website project"
					/>
				{:else}
					<div class="placeholder"></div>
				{/if}
				<div class="text">
					{#if visible}
						<h3>{project.name}</h3>
						<p>{project.description}</p>
					{:else}
						<span id="pt">&nbsp;</span>
						<p style="margin-bottom: 13.2%;"></p>
					{/if}
					<div class="tech">
						{#each project.tech as tech}
							{#if project.image}
								<div class="tech-col">
									<img
										in:fade={{ duration: 350 }}
										src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}`}
										alt={tech.name}
									/>
									<span>{tech.name}</span>
								</div>
							{:else}
								<div class="placeholder-icon"></div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<button onclick={() => goto('/projects')} class="btn-primary"
		>{#if visible}{$t('pAction')}{:else}
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
		height: auto;
		position: relative;
		text-transform: none;
		overflow: hidden;
		text-align: center;
		transition: background-image 1s ease-in-out;
	}

	.project-section h2,
	#pst {
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
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%);
		border-radius: 15px;
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
	.project:hover #project-img {
		transform: scale(1.06) translateY(2.5%);
		filter: brightness(110%);
	}
	#project-img {
		filter: brightness(72%);
		border-radius: 10px;
	}
	.project img {
		user-select: none;
		-webkit-user-drag: none;
		margin-bottom: 0;
		aspect-ratio: 16/10;
		transition:
			transform 0.4s,
			filter 0.4s;
		width: 100%;
		height: auto;
	}
	.placeholder {
		aspect-ratio: 16/10;
		width: 100%;
		height: auto;
		border-radius: 10px;
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.02) 50%,
			rgba(255, 255, 255, 0.04) 100%
		);
	}
	.project h3,
	#pt {
		-webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
		font-family: 'Montserrat';
		font-weight: 900;
		letter-spacing: 0.025rem;
		font-size: 1.4rem;
		margin-bottom: 0.5rem;
	}
	.text {
		padding: 1rem;
		padding-top: 2rem;
		border-radius: 8px;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
	}
	.project p {
		font-size: 1rem;
		color: #ccc;
	}
	.tech {
		margin-top: 2.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.tech-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		margin-bottom: 0.9rem;
		transition: transform 0.3s ease;
	}
	.tech-col:hover {
		transform: translateY(-5px);
	}
	.tech-col:hover img {
		transform: scale(1.1);
	}

	.tech-col span {
		user-select: none;
		position: absolute;
		bottom: -1.5rem;
		background-color: rgba(0, 0, 0, 0.075);
		color: #ccc;
		border-radius: 4px;
		font-size: 0.75rem;
		white-space: nowrap;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.tech-col:hover span {
		opacity: 1;
	}
	.tech img {
		-webkit-user-drag: none;
		user-select: none;
		width: 3.75rem;
		height: auto;
	}
	.placeholder-icon {
		aspect-ratio: 2/2;
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.02) 50%,
			rgba(255, 255, 255, 0.04) 100%
		);
		border-radius: 50%;
		width: 2.35rem;
		margin: 0 0.75rem;
		height: auto;
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
		transform: translateY(-7.5%);
	}

	@media (min-width: 1500px) {
		.project h3,
		#pt {
			font-size: 1.6rem;
		}
		.project-section {
			height: auto;
			padding: 10rem 0;
		}
		.project-list {
			gap: 5rem;
		}
		.project {
			width: 30vw;
		}
	}
	@media (max-width: 1500px) {
		.project {
			aspect-ratio: 10/11.9;
		}
	}
	@media (max-width: 768px) {
		.project-section h2 {
			font-size: 2rem;
		}
		.project-section {
			padding: 2rem;
		}

		.project-list {
			gap: 4rem;
			flex-direction: column;
			align-items: center;
		}

		.project {
			aspect-ratio: 0;
			width: 100%;
		}
		.btn-primary {
			margin: 1rem;
		}
	}
</style>
