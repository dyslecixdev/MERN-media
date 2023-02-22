import {useContext} from 'react';

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import {tokens} from '../theme';
import {ColorModeContext} from '../theme';

function Home() {
	const theme = useTheme();
	const {mode} = theme.palette;
	const colors = tokens(mode);
	const colorMode = useContext(ColorModeContext);

	return (
		<Box
			class={`min-h-[90vh] flex justify-center items-center font-source ${
				mode === 'dark' ? '' : 'bg-off-white'
			}`}
		>
			Home
		</Box>
	);
}

export default Home;
