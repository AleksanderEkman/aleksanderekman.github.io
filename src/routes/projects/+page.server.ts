import { fetchProjects, fetchProjectImages } from '$lib/supabaseClient.js'

export const load = async (event) => {
    const projects = await fetchProjects()
    if (!projects) {
        return null
    }
    const projectsWithImages = await Promise.all(projects.map(async (project) => {
        project.images = await fetchProjectImages(project.id)
        return project
    }))
    
    return { projectsWithImages }
}