import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Profile } from '../../types/profile';

interface ProfileState {
	profile: Profile | null;
	loading: boolean;
}

const initialState: ProfileState = {
	profile: null,
	loading: false,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile(state, action: PayloadAction<Profile | null>) {
			state.profile = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
	},
});

export const { setProfile, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
