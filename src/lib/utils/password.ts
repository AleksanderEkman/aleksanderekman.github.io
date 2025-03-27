import bcryptjs from 'bcryptjs';

export async function hashPassword(password: string, SALT_ROUNDS = 12): Promise<string> {
	const salt = await bcryptjs.genSalt(SALT_ROUNDS);
	return await bcryptjs.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
	return await bcryptjs.compare(password, hash);
}

export async function hashToken(token: string, SALT_ROUNDS = 4): Promise<string> {
	const salt = await bcryptjs.genSalt(SALT_ROUNDS);
	return await bcryptjs.hash(token, salt);
}