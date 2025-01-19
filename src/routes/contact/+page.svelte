<script lang="ts">
	import ContactSection from './ContactSection.svelte';
	import ParticleCanvas from "../components/ParticleCanvas.svelte";
</script>
<svelte:head>
	<title>Aleksander Ekman Kontaktskjema</title>
	<link rel="canonical" href="https://allsers.github.io/kontakt-oss" />
</svelte:head>

<ParticleCanvas />
<main>
	<section class="contact">
		<ContactSection />
	</section>
</main>

<style>
	.contact {
		padding: 4.5rem 0.75rem;
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
	@media (min-width: 1450px) {
		.contact {
			height: 86.25vh;
		}
	}
	@media (max-width: 540px) {
		.contact {
			padding: 4.5rem 1rem;
			height: 47.5rem;
		}
	}
</style>
