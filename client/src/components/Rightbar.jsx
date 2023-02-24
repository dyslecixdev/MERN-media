// RIGHTBAR

import {Link} from 'react-router-dom';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import DarkLogo from '../assets/logo-text-dark.png';
import LightLogo from '../assets/logo-text-light.png';

import {friends} from '../data';

function Rightbar() {
	const theme = useTheme();
	const {mode} = theme.palette;

	return (
		<Box class='h-[90vh] w-full flex-2 hidden sm:flex flex-col items-center px-4 font-source sticky top-20'>
			{/* FRIENDS LIST */}
			<Box class='h-full w-full flex-9 flex flex-col gap-[20px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue scrollbar-track-transparent'>
				<Typography class='font-playfair text-2xl self-center'>Friends</Typography>

				{/* FRIEND LIST ITEM */}
				<List>
					{friends.map(friend => (
						<ListItem key={friend.id}>
							<ListItemButton component={Link} to={`/profile/${friend.id}`}>
								<ListItemAvatar>
									<Avatar
										alt={friend.username}
										src={friend.profilePic || friend.username[0]}
									/>
								</ListItemAvatar>
								<ListItemText primary={friend.username} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>

			{/* FOOTER */}
			<Box class='flex-1 w-full h-full mt-4 flex gap-[10px] items-center'>
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
