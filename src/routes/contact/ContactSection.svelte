<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import emailjs from '@emailjs/browser';
	import { waitLocale } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	let form: HTMLFormElement;
	let translationReady = false;

	onMount(() => {
		async function initialize() {
			await waitLocale();
			translationReady = true;
		}

		initialize();
		emailjs.init('B_EqCDh0_Z8E6tYJP');
	});

	const handleSubmit = (event: Event) => {
		event.preventDefault();

		emailjs.sendForm('service_i7l5pv2', 'template_y50jgqf', form).then(
			() => {
				form.reset();
			},
			(error) => {
				console.log('FAILED...', error);
			}
		);
	};
</script>

<svelte:head>
	<style>
		.contact-field {
			visibility: hidden;
		}
		.contact-field.ready {
			visibility: visible;
		}
	</style>
</svelte:head>

<form
	id="contact-form"
	bind:this={form}
	method="POST"
	class="contact-field {translationReady ? 'ready' : ''}"
	on:submit={handleSubmit}
	hidden={!translationReady}
>
	{#if translationReady}
		<div class="contact-content" in:fade={{ duration: 200 }}>
			<div class="divide">
				<div class="desc">
					<h1 id="contact-header">{$t('contactTitle')}</h1>
					<p>{$t('contactDesc')}</p>
				</div>
			</div>

			<div class="divide">
				<div class="input-container">
					<label for="name">{$t('contactName')}</label>
					<input type="text" id="name" name="from_name" autocomplete="name" required />
				</div>
				<div class="input-container">
					<label for="email">{$t('contactEmail')}</label>
					<input type="email" id="email" name="from_email" required autocomplete="email" />
				</div>
				<div class="input-container">
					<label for="message">{$t('contactMessage')}</label>
					<textarea id="message" name="message" required></textarea>
				</div>
				<div class="button-container">
					<button type="submit">Send</button>
				</div>
			</div>
		</div>
	{/if}
</form>

<style>
	.contact-field.ready {
		visibility: visible;
	}
	.divide {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: auto;
	}
	.button-container {
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.contact-field {
		visibility: hidden;
		font-size: 1.2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100svh;
		position: relative;
		text-transform: none;
		overflow: hidden;
		text-align: left;
	}

	.contact-content {
		z-index: 2;
		backdrop-filter: blur(15px);
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: none;
		border-radius: 40px;
		padding: 1rem;
		width: 40%;
		background-color: rgba(10, 15, 10, 0.2);
		box-shadow:
			inset 0 0 0 0.1rem rgba(0, 0, 0, 0.1),
			0 4px 8px rgba(0, 0, 0, 0.4);
		transition:
			transform 0.4s,
			box-shadow 0.4s;
	}
	.contact-content:hover {
		transform: translateY(-1.5%);
		box-shadow:
			inset 0 0 0 0.1rem rgba(0, 0, 0, 0.1),
			0 0px 15px rgba(255, 255, 255, 0.4);
	}

	.desc {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		text-transform: none;
		text-align: center;
		padding: 1rem;
		margin-bottom: 0.4rem;
	}
	.desc p {
		text-wrap: wrap;
		width: 70%;
	}
	#contact-header {
		font-family: var(--font-impact);
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	label {
		cursor: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.input-container {
		cursor: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		font-family: Helvetica, sans-serif;
		width: 60%;
		margin: 0 0 0.25rem 0;
		padding: 0.5rem;
	}

	input:-webkit-autofill,
	textarea:-webkit-autofill {
		background-color: rgba(15, 0, 0, 0.1) !important;
		-webkit-text-fill-color: black !important;
	}
	input,
	textarea {
		height: 2.5rem;
		margin: 0;
		overflow: hidden;
		border-radius: 7px;
		border: solid 0.8px var(--text-color);
		color: white;
		padding: 0.4rem;
		width: 100%;
		resize: none;
		background-color: transparent;
		transition: background-color 0.2s;
		font-size: 0.95rem;
		--tw-ring-color: rgba(255, 255, 255, 0.5);
	}
	input:active {
		border-color: white !important;
	}
	input:focus,
	textarea:focus {
		cursor: none;
	}
	input:hover,
	textarea:hover {
		cursor: none;
		background-color: rgba(255, 255, 255, 0.06);
	}

	#message {
		height: 15rem;
		min-height: 15rem;
		max-height: 20rem;
		padding: 0.4rem;
		font-size: 1rem;
		resize: vertical;
		color: var(--text-color);
	}

	button {
		font-weight: bold;
		overflow: hidden;
		font-family: var(--font-header);
		font-size: 1.2rem;
		padding: 0 2rem;
		margin: 0;
		border-radius: 50px;
		height: 4rem;
		transition: transform 0.2s;
		background-color: var(--text-color);
		color: #0a1828;
	}

	button:hover {
		cursor: none;
		transform: translateY(-3px);
	}

	button:active {
		background-color: rgb(122, 105, 88);
		transform: scale(0.95);
	}

	@media screen and (max-width: 1600px) {
		.contact-field {
			margin-top: 3rem;
		}
		.input-container {
			margin: 0;
			width: 60%;
			padding: 0.5rem;
		}

		.contact-content {
			padding: 1rem;
		}

		#message {
			height: 6.25rem;
			min-height: 6.25rem;
			max-height: 20rem;
		}
	}

	@media screen and (max-width: 915px) {
		#contact-header {
			font-size: 2.5rem;
		}
		.contact-content {
			width: 80%;
		}
		.contact-field {
			font-size: 0.9rem;
		}

		button {
			font-size: 1.5rem;
		}

		#message {
			height: 10rem;
		}
	}

	@media screen and (max-width: 800px) {
		#contact-header {
			font-size: 1.75rem;
		}
		#message {
			height: 5rem;
			font-size: 1rem;
		}
		button {
			font-size: 1rem;
		}
		input,
		textarea {
			padding: 0.25rem;
			font-size: 0.75rem;
		}

		button {
			padding: 0 1.5rem;
			height: 3.5rem;
		}
		.input-container {
			width: 80%;
		}
	}
	@media (max-width: 1024px) and (max-height: 768px) and (orientation: landscape) {
		.contact-field {
			width: 90%;
			height: 100%;
			margin-top: 0;
			padding: 0;
		}

		.contact-content {
			margin-top: 3.5rem;
			display: flex;
			flex-direction: row; /* Set to row for landscape */
			justify-content: space-between; /* Space elements evenly */
			align-items: flex-start; /* Align items at the start */
			height: 80%;
			padding: 0 0.5rem;
		}

		.divide {
			display: flex;
			flex-direction: column; /* Keep as column for inner content */
			width: 48%; /* Adjust width for two columns */
		}

		.input-container {
			width: 100%;
		}
		.desc p {
			width: 90%; /* Full width description */
		}
		button {
			left: 18%;
			bottom: 3rem;
			position: absolute;
			height: 3.5rem;
			font-size: 1.1rem;
		}
		#contact-header {
			font-size: 2.3rem;
		}
		#message {
			height: 5rem;
		}
	}
</style>
