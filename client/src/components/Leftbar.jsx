// LEFTBAR

import {Link} from 'react-router-dom';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

import {user} from '../data';

function Leftbar() {
	const theme = useTheme();
	const {mode} = theme.palette;

	return (
		<Box class='h-full flex-1 hidden lg:block sticky top-20 font-source'>
			<Box
				class={`h-content w-full rounded-md flex flex-col items-center pt-4 px-8 ${
					mode === 'dark'
						? 'bg-gradient-to-br from-blue via-black to-black'
						: 'bg-gradient-to-br from-blue via-white to-white'
				}`}
			>
				{/* TOP HALF OF LEFTBAR */}
				<Box class='flex flex-col gap-[20px] items-center mb-4 border-b-2'>
					{/* USER AVATAR */}
					<Avatar
						alt={user.username}
						src={user.profilePic || user.username[0]}
						sx={{height: '100px', width: '100px'}}
					/>

					{/* USERNAME */}
					<Typography
						component={Link}
						to={`/profile/${user.id}`}
						class='font-playfair text-2xl hover:text-blue transition-colors ease-out'
					>
						{user.username}
					</Typography>

					{/* USER DESCRIPTION */}
					<Typography class='text-sm'>{user.desc}</Typography>
				</Box>

				{/* BOTTOM HALF OF LEFTBAR */}
				<Box>
					<List>
						{/* USER POSTS */}
						<ListItem>
							<ListItemIcon sx={{color: 'purple'}}>
								<ModeOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary='Posts' secondary={user.posts} />
						</ListItem>

						{/* USER LIKES */}
						<ListItem>
							<ListItemIcon sx={{color: 'red'}}>
								<FavoriteBorderOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary='Likes' secondary={user.likes} />
						</ListItem>

						{/* USER COMMENTS */}
						<ListItem>
							<ListItemIcon sx={{color: 'green'}}>
								<MessageOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary='Comments' secondary={user.comments} />
						</ListItem>
					</List>
				</Box>
			</Box>
		</Box>
	);
}

export default Leftbar;
