import { createClient } from '@supabase/supabase-js';
import { hashToken, comparePassword } from '$lib/utils/password';
import { config } from 'dotenv';

config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseKey || !supabaseUrl) {
	throw new Error('Missing SUPABASE environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
});

export async function loginUser(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      return data;
    } 
    catch (error) {
        if (error instanceof Error) {
            console.error('Error logging in:', error.message);
        } else {
            console.error('Unexpected error logging in:', error);
        }
    };
}

export async function insertProject(project_name: string, project_description: string, project_body: string) { 
  const { data, error } = await supabase
  .rpc('insert_project', {
    project_name: project_name,
    project_desc: project_description,
    project_body: project_body
  });
  if (error) {
    console.error('Error:', error);
  }
  return data;
}

export async function fetchProjects() {
  const { data, error } = await supabase
  .from('projects')
  .select('*');
  if (error) {
    console.error('Error:', error);
  }
  return data;
}

export async function fetchProjectImages(projectId: string) {
  // List all files in the specified folder
  const { data: files, error: listError } = await supabase
    .storage
    .from('projectimgs')
    .list(projectId);

  if (listError) {
    console.error('Error listing files:', listError);
    return [];
  }

  // Generate signed URLs for each file
  const signedUrls = await Promise.all(
    files.map(async (file) => {
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('projectimgs')
        .createSignedUrl(`${projectId}/${file.name}`, 60 * 60); // URL valid for 1 hour

      if (signedUrlError) {
        console.error(`Error creating signed URL for ${file.name}:`, signedUrlError);
        return null;
      }

      return signedUrlData.signedUrl;
    })
  );

  // Filter out any null values (in case of errors)
  return signedUrls.filter((url) => url !== null);
}

export async function uploadImage(
	bucketName = 'projectimgs',
	file: Blob,
	filename: string,
	projectId: string,
) {
	const { data, error } = await supabase.storage
		.from(bucketName)
		.upload(`${projectId}/${filename}`, file);

	if (error) {
		console.error('Error uploading file:', error);
		return;
	}
}

