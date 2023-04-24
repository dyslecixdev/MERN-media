// CHATROOM PAGE

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Friends from '../components/Friends';
import Users from '../components/Users';

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

				<Divider sx={{width: '100%', marginBottom: '15px', backgroundColor: '#2da4f8'}} />

				<Users class='flex-1' />
			</Box>
		</Box>
	);
}

export default Chats;
