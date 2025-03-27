import { fetchProjects } from '$lib/supabaseClient.js'

export const load = async (event) => {
    const projects = await fetchProjects()
    return { projects }
}