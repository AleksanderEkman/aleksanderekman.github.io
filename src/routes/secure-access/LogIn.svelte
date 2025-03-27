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
		<h1>Logg inn</h1>
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
			<button class="login-button" type="submit">Logg inn</button>
	</form>
</section>

<style>
	.login-section {
		z-index: 5;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	.login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
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
</style>