import { mockProfile } from '../mock/profile';
import type { Profile } from '../types/profile';

export const getProfile = async (): Promise<Profile> => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockProfile;
};
