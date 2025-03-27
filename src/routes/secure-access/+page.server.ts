import { fail, redirect, error } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { loginSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { sleep } from '$lib/utils/helpers';
import { loginUser } from '$lib/supabaseClient';

const limiter = new RateLimiter({
	IP: [5, '10m'], // 5 forsøk hvert tiende minutt per IP
	IPUA: [15, 'h'] // 15 forsøk hver time per IP & User-Agent
});


export const load = async (event) => {
    const form = await superValidate(event, zod(loginSchema));
    return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));

		if (await limiter.isLimited(event)) {
			form.errors.password = ['For mange forsøk. Vennligst prøv igjen senere.'];
			return fail(429, { form })
		};
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const result = await loginUser(form.data.identifier, form.data.password);

			if (!result || !result.session) {
				throw new Error('Failed to retrieve session');
			}
			await event.locals.supabase.auth.setSession(result.session);
		} catch (error) {
			console.error('Login error:', error);
			form.errors.password = ['Uyldig e-postadresse eller passord'];
			return fail(401, { form });
		}
		throw redirect(303, '/admin-dashboard8ddd52aa-f984');
	}
};