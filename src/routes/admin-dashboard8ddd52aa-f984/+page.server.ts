import { fail, redirect, error } from '@sveltejs/kit';
import { newProjectSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { insertProject, uploadImage } from '$lib/supabaseClient';

export const load = async (event) => {
    const form = await superValidate(event, zod(newProjectSchema));
    return { form };
};

export const actions = {
	default: async ({ request }) => {
        const data = await request.formData();

        const form = await superValidate(data, zod(newProjectSchema));
        if (!form.valid) {
            return fail(400, { form });
        }
        let project_id: string | null = null;
        let project_data: any;
        try {
            project_data = await insertProject(form.data.title, form.data.description, form.data.body);
            project_id = project_data[0].id;
            console.log('Project inserted:', project_data);
        }
        catch (error) {
            console.error('Error inserting project:', error);
            return fail(500);
        }
        if (!project_id) {
            console.error('No project ID returned');
            return fail(500);
        };
        const files = data.getAll('image') as File[];
        
        if (files.length > 0) {
            try {
                await Promise.all(
                    files.map(async (file) => {
                    const filename = file.name;
                    await uploadImage('projectimgs', file, filename, project_id);
                    console.log('Image uploaded successfully:', filename);
                    })
                );
            } catch (error) {
                console.error('Error uploading image:', error);
                return fail(500, { form });
            }
        } else {
            console.error('No file uploaded or file is empty');
            return fail(400, { form, errors: { image: 'Bilde er påkrevd' } });
        }
        
    }
};