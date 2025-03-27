<script lang="ts">
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { newProjectSchema } from '$lib/schemas';
	export let data: PageData;

	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage:
			'Er du sikker på at du vil forlate siden? Alle endringer du har gjort vil gå tapt.',
		validators: zod(newProjectSchema)
	});
</script>

<section class="login-section">
	<form method="POST" use:enhance class="login-form" enctype="multipart/form-data">
		<h1>Opprett prosjekt</h1>
			<div class="input-container">
				<label for="title">Tittel</label>
				<input 
					type="text" 
					id="title" 
					name="title" 
					placeholder="Skriv tittel" 
					required bind:value={$form.title} 
				/>
				{#if $errors.title}
					<small id="error">{$errors.title}</small>
				{:else}
					<small id="error">&nbsp;</small>
				{/if}
			</div>
			<div class="input-container">
				<label for="description">Beskrivelse</label>
                <input
                    type='text'
                    id="description"
                    name="description"
                    required
                    bind:value={$form.description}
                    placeholder="Skriv beskrivelse"
                />

				{#if $errors.description}
					<small id="error">{$errors.description}</small>
				{:else}
					<small id="error">&nbsp;</small>
				{/if}
			</div>
            <div class="input-container">
				<label for="description">Tekstinnhold</label>
                <textarea name="body" id="body" bind:value={$form.body} placeholder="Skriv innhold" required>
                </textarea>

				{#if $errors.body}
					<small id="error">{$errors.body}</small>
				{:else}
					<small id="error">&nbsp;</small>
				{/if}
			</div>
            <div class="input-container">
                <label for="image">Last opp bilde</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    required
                />
                {#if $errors.image}
                    <small id="error">{$errors.image}</small>
                {:else}
                    <small id="error">&nbsp;</small>
                {/if}
            </div>
			<button class="submit-button" type="submit">Opprett prosjekt</button>
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
    input,textarea {
        color: black;
    }
</style>
