// PROFILE PAGE

import {useContext} from 'react';

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import UserContainer from '../components/UserContainer';
import UserPosts from '../components/UserPosts';

import {tokens} from '../theme';
import {ColorModeContext} from '../theme';

function Profile() {
	const theme = useTheme();
	const {mode} = theme.palette;
	const colors = tokens(mode);
	const colorMode = useContext(ColorModeContext);

	return (
		<Box
			class={`min-h-[90vh] flex flex-col font-source px-8 py-4 ${
				mode === 'dark' ? '' : 'bg-off-white'
			}`}
		>
			<UserContainer />
			<UserPosts />
		</Box>
	);
}

export default Profile;
