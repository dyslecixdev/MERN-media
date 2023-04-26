// CHATROOM PAGE

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import MessageContainer from '../components/MessageContainer';
import Friends from '../components/Friends';

function Chats() {
	const theme = useTheme();
	const {mode} = theme.palette;

	return (
		<Box
			class={`min-h-[90vh] w-full flex md:flex-row flex-col gap-[50px] font-source xs:px-4 sm:px-8 md:px-0 md:pl-12 ${
				mode === 'dark' ? '' : 'bg-off-white'
			}`}
		>
			{/* MESSAGE CONTAINER */}
			<MessageContainer class='flex-8' />

			{/* FRIENDS */}
			<Box class='h-[90vh] w-full flex-4 sm:flex-row flex-col items-center px-4 font-source sticky top-20 gap-[20px]'>
				<Friends chat={true} class='flex-1' />
			</Box>
		</Box>
	);
}

export default Chats;
