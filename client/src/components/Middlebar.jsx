// MIDDLEBAR

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import WritePost from './WritePost';

function Middlebar({user}) {
	const theme = useTheme();
	const {mode} = theme.palette;

	return (
		<Box class='h-full w-full py-8 flex-5'>
			<WritePost user={user} />
		</Box>
	);
}

export default Middlebar;
