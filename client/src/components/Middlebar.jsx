// MIDDLEBAR

import Box from '@mui/material/Box';

import WritePost from './WritePost';
import Posts from './Posts';

function Middlebar() {
	return (
		<Box class='h-full w-full py-8 flex-6'>
			<WritePost />
			<Posts />
		</Box>
	);
}

export default Middlebar;
