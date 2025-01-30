<script lang="ts">
	import ContactSection from './ContactSection.svelte';
	import ParticleCanvas from '../components/ParticleCanvas.svelte';
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Aleksander Ekman - {$t('cPageTitle')}</title>
	<link rel="canonical" href="https://aleksanderekman.no/contact" />
</svelte:head>

<ParticleCanvas />
<section class="contact">
	<ContactSection />
</section>

<style>
	.contact {
		padding: 3rem 0.75rem;
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
			padding: 1rem 1rem;
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
