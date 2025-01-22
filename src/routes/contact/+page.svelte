<script lang="ts">
	import ContactSection from './ContactSection.svelte';
	import ParticleCanvas from '../components/ParticleCanvas.svelte';
</script>

<svelte:head>
	<title>Aleksander Ekman Kontaktskjema</title>
	<link rel="canonical" href="https://allsers.github.io/contact" />
</svelte:head>

<ParticleCanvas />
<section class="contact">
	<ContactSection />
</section>

<style>
	.contact {
		padding: 2rem 0.75rem;
		color: var(--text-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100svh;
		position: relative;
		text-transform: none;
		overflow: hidden;
		text-align: center;
		transition: background-image 1s ease-in-out;
	}

	@media (max-width: 1024px) {
		.contact {
			padding: 4.5rem 1rem;
			height: 100svh;
		}
	}
	@media (max-width: 1024px) and (orientation: landscape) {
		.contact {
			padding: 0;
			overflow-y: auto;
		}
	}
</style>
