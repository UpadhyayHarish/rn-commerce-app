import { useEffect, useState } from 'react';
import { getProfile } from '../services/profileService';
import type { Profile } from '../types/profile';

export const useProfile = () => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		getProfile().then((data) => {
			if (mounted) setProfile(data);
			setLoading(false);
		});
		return () => {
			mounted = false;
		};
	}, []);

	return { profile, loading };
};
