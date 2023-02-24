// MIDDLEBAR

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import WritePost from './WritePost';
import Posts from './Posts';

function Middlebar() {
	const theme = useTheme();
	const {mode} = theme.palette;

	return (
		<Box class='h-full w-full py-8 flex-5'>
			<WritePost />
			<Posts />
		</Box>
	);
}

export default Middlebar;
