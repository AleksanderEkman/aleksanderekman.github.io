<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import emailjs from '@emailjs/browser';

	let form: HTMLFormElement;

	onMount(() => {
		emailjs.init("B_EqCDh0_Z8E6tYJP");
	});

	const handleSubmit = (event: Event) => {
		event.preventDefault();

		emailjs.sendForm('service_i7l5pv2', 'template_y50jgqf', form)
			.then(() => {
				form.reset();
			}, (error) => {
				console.log('FAILED...', error);
				// Add error handling here (e.g., show an error message)
			});
	};
</script>

<form
	id = "contact-form"
	bind:this={form}
  method="POST"
  class="contact-field"
  on:submit={handleSubmit}
>
    <div class="contact-content">
        <div class="desc">
			<h1 id="contact-header">{ $t('contactTitle' )}</h1>
			<p>{ $t('contactDesc') }</p>
		</div>
        <div class="input-container">
			<label for="name">{ $t('contactName' ) }</label>
			<input type="text" id="name" name="from_name" autocomplete="name" required />
		</div>
        <div class="input-container">
            <label for="email">{ $t('contactEmail') }</label>
            <input
                type="email"
                id="email"
                name="from_email"
                required
                autocomplete="email"
            />
        </div>
        <div class="input-container">
			<label for="message">{ $t('contactMessage') }</label>
			<textarea id="message" name="message" required></textarea>
		</div>
		<div class="button-container">
			<button type="submit">Send</button>
		</div>
    </div>
</form>

<style>
	.button-container {
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.contact-field {
		font-size: 1.2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 40%;
		height: 100svh;
		position: relative;
		text-transform: none;
		overflow: hidden;
		text-align: left;
		transition: background-image 1s ease-in-out;
	}

	.contact-content {
		backdrop-filter: blur(15px);
		display: flex;
		flex-direction: column;
		align-items: center;
        cursor: none;
		border-radius: 40px;
		padding: 2rem;
		width: 100%;
		background-color: rgba(10, 15, 10, 0.2);
		box-shadow:
			inset 0 0 0 0.1rem rgba(0, 0, 0, 0.1),
			0 4px 8px rgba(0, 0, 0, 0.4);
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
		width: 50%;
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
		transition: all 0.2s;
		font-size: 0.95rem;
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
		transition: all 0.2s;
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
			width: 55%;
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

	@media screen and (max-width: 540px) {
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

		.contact-field {
			width: 97.5%;
		}

		button {
			padding: 0 1.5rem;
			height: 3.5rem;
		}
		.input-container {
			width: 80%;
		}
	}
</style>
