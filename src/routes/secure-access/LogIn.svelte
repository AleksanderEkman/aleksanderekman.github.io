<script lang="ts">
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { loginSchema } from '$lib/schemas';
	export let data: PageData;

	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage:
			'Er du sikker på at du vil forlate siden? Alle endringer du har gjort vil gå tapt.',
		validators: zod(loginSchema)
	});

	$: passwordValue = $form.password;
	$: $form.password = passwordValue;
	
</script>

<section class="login-section">
	<form method="POST" use:enhance class="login-form">
		<h1>Admin-portal</h1>
			<div class="input-container">
				<label for="email">E-post</label>
				<input 
					type="text" 
					id="identifier" 
					name="identifier" 
					placeholder="Skriv e-postadresse" 
					required bind:value={$form.identifier} 
				/>
				{#if $errors.identifier}
					<small id="error">{$errors.identifier}</small>
				{:else}
					<small id="error">&nbsp;</small>
				{/if}
			</div>
			<div class="input-container">
				<label for="password">Passord</label>
				<div class="password-input">
					<input
						type={'password'}
						id="password"
						name="password"
						required
						bind:value={passwordValue}
						placeholder="Skriv passord"
					/>
				</div>
				{#if $errors.password}
					<small id="error">{$errors.password}</small>
				{:else}
					<small id="error">&nbsp;</small>
				{/if}
			</div>
			<div class="button-container">
				<button class="login-button" type="submit">Logg inn</button>
			</div>
	</form>
</section>

<style>
	.login-section {
		z-index: 5;
		display: flex;
		font-size: 1.2rem;
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
	.login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100vw;
		max-width: 400px;
		padding: 1rem;
		background-color: var(--color-background);
		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		z-index: 5;
		color: white;
	}
	.login-button {
		width: 100%;
	}
	.input-container {
		display: flex;
		flex-direction: column;
        width: 100%;
	}
	
	input {
		color: black;
	}
	.button-container {
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}


	.login-form {
		z-index: 2;
		backdrop-filter: blur(15px);
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: none;
		border-radius: 40px;
		padding: 1rem;
		width: 50%;
		background-color: rgba(10, 15, 10, 0.2);
		box-shadow:
			inset 0 0 0 0.1rem rgba(0, 0, 0, 0.1),
			0 3px 6px rgba(0, 0, 0, 0.2);
		transition:
			transform 0.4s,
			box-shadow 0.4s;
	}


	h1 {
		font-family: var(--font-impact);
		font-size: 1.75rem;
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

	input:-webkit-autofill {
		background-color: rgba(15, 0, 0, 0.1) !important;
		-webkit-text-fill-color: black !important;
	}
	input {
		height: 2.5rem;
		margin: 0;
		overflow: hidden;
		border-radius: 7px;
		border: solid 0.8px var(--text-color);
		color: white !important;
		padding: 0.4rem;
		width: 100%;
		resize: none;
		background-color: transparent;
		transition: background-color 0.2s;
		font-size: 0.95rem;
	}
	input:active {
		border-color: white !important;
	}
	input:focus,

	input:hover {
		cursor: none;
	}

	input::placeholder {
		opacity: 0.6;
		color: #7d7d7d; /* Subtle, muted color */
		font-size: 0.9rem; /* Slightly smaller than the input text */
		font-style: italic; /* Optional, to distinguish it from normal text */
	}
	input:focus::placeholder {
		color: #6e6e6e;
		opacity: 0.4;
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
		transition:
			background-color 0.2s,
			transform 0.2s;
		background-color: var(--text-color);
		color: #0a1828;
	}

	button:hover {
		cursor: none;
		transform: translateY(-3px);
		background-color: #b49d84;
	}

	button:active {
		background-color: rgb(122, 105, 88);
		transform: scale(0.95);
	}
	@media screen and (max-width: 1600px) {
		.login-form {
			margin-top: 2rem;
			width: 90vw;
		}
		.input-container {
			margin: 0;
			width: 90%;
			padding: 0.5rem;
		}

		.login-form {
			width: 100%;
			padding: 1rem;
		}

	}

	@media screen and (max-width: 915px) {
		h1 {
			font-size: 2.5rem;
		}
		.login-form {
			width: 80%;
		}
		.login-form {
			font-size: 0.9rem;
		}

		button {
			font-size: 1.5rem;
		}
	}

	@media screen and (max-width: 800px) {
		h1 {
			font-size: 1.75rem;
		}
		button {
			font-size: 1rem;
		}
		input {
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
	@media (max-height: 720px) and (max-width: 430px) {
		.login-form {
			padding: 0rem 0rem;
		}
		h1 {
			font-size: 1.5rem;
		}

	}
	@media (max-height: 800px) and (min-width: 540px) {
		.login-form {
			transform: scale(0.78);
		}
	}
	@media (max-width: 1024px) and (max-height: 768px) and (orientation: landscape) {
		.login-form {
			width: 90%;
			height: 100%;
			margin-top: 0;
			padding: 0;
		}

		.login-form {
			margin-top: 3.5rem;
			display: flex;
			flex-direction: row; /* Set to row for landscape */
			justify-content: space-between; /* Space elements evenly */
			align-items: flex-start; /* Align items at the start */
			height: 80%;
			padding: 0 0rem;
		}

		.input-container {
			width: 100%;
		}
		button {
			left: 18%;
			bottom: 3rem;
			position: absolute;
			height: 3.5rem;
			font-size: 1.1rem;
		}
		h1 {
			font-size: 2.3rem;
		}
	}
</style>