import { z } from 'zod';

export const loginSchema = z.object({
	identifier: z.string().email({ message: 'E-postadressen er ugyldig' }),
	password: z.string().min(10, { message: 'Passordet må være minst 10 tegn' })
});

export const newProjectSchema = z.object({
	title: z.string().min(1, { message: 'Tittel må fylles ut' }),
	description: z.string().min(1, { message: 'Beskrivelse må fylles ut' }),
	body: z.string().min(1, { message: 'Innhold må fylles ut' }),
	image: z.any().optional()
});
