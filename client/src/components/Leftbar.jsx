import {useContext} from 'react';
import {Link} from 'react-router-dom';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

import {tokens} from '../theme';
import {ColorModeContext} from '../theme';

// Fake user data.
const user = {
	id: 1,
	username: 'Christian',
	email: 'cd@gmail.com',
	profilePic: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
	desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt architecto pariatur praesentium maiores hic! Atque quod repudiandae officia delectus voluptas eos maxime a assumenda maiores sequi molestias itaque, veniam molestiae!'
};

// Fake posts data.
const posts = 5;

// Fake likes data.
const likes = 7;

// Fake comments data.
const comments = 3;

function Leftbar() {
	const theme = useTheme();
	const {mode} = theme.palette;
	const colors = tokens(mode);
	const colorMode = useContext(ColorModeContext);

	return (
		<Box
			class={`h-full w-full flex-2 rounded-md flex flex-col items-center pt-4 px-8 ${
				mode === 'dark'
					? 'bg-gradient-to-br from-black via-black to-blue'
					: 'bg-gradient-to-br from-white via-white to-blue'
			}`}
		>
			{/* TOP HALF OF LEFTBAR */}
			<Box class='flex flex-col gap-[20px] items-center mb-4'>
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

			<Divider variant='middle' class='w-full' />

			{/* BOTTOM HALF OF LEFTBAR */}
			<Box>
				<List>
					{/* USER POSTS */}
					<ListItem>
						<ListItemIcon>
							<ModeOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary='Posts' secondary={posts} />
					</ListItem>

					{/* USER LIKES */}
					<ListItem>
						<ListItemIcon>
							<FavoriteBorderOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary='Likes' secondary={likes} />
					</ListItem>

					{/* USER COMMENTS */}
					<ListItem>
						<ListItemIcon>
							<MessageOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary='Comments' secondary={comments} />
					</ListItem>
				</List>
			</Box>
		</Box>
	);
}

export default Leftbar;
