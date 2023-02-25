// CHATROOM PAGE

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import Friends from '../components/Friends';

function Chats() {
	const theme = useTheme();
	const {mode} = theme.palette;

	return (
		<Box
			class={`min-h-[90vh] w-full flex md:gap-[50px] font-source md:pl-12 ${
				mode === 'dark' ? '' : 'bg-off-white'
			}`}
		>
			{/* CHATROOM CONTAINER */}
			<Box class='flex-8'>Chatroom</Box>

			{/* FRIENDS AND CONTACTS */}
			<Box class='h-[90vh] w-full flex-3 hidden sm:flex flex-col items-center px-4 font-source sticky top-20 gap-[20px]'>
				<Friends class='flex-1' />
				<Friends class='flex-1' />
			</Box>
		</Box>
	);
}

export default Chats;
