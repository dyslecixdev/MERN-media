// RIGHTBAR

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import DarkLogo from '../assets/logo-text-dark.png';
import LightLogo from '../assets/logo-text-light.png';

import Friends from './Friends';
import Users from './Users';

function Rightbar() {
	const theme = useTheme();
	const {mode} = theme.palette;

	return (
		<Box class='h-[90vh] w-full flex-3 hidden sm:flex flex-col items-center px-4 font-source sticky top-20'>
			<Friends class='flex-4' />

			<Divider sx={{width: '100%', marginBottom: '15px', backgroundColor: '#2da4f8'}} />

			<Users class='flex-4' />

			{/* FOOTER */}
			<Box class='flex-2 w-full h-full mt-4 flex gap-[10px] items-center'>
				<Box
					component='img'
					src={mode === 'dark' ? DarkLogo : LightLogo}
					alt='logo'
					class='h-[9.5vh] w-fit object-cover'
				/>
				<Typography class='text-sm font-playfair font-black'>Christian Demesa</Typography>
				<Typography class='text-sm font-playfair font-black'>2023</Typography>
			</Box>
		</Box>
	);
}

export default Rightbar;
