// USER CONTAINER

import {useParams} from 'react-router-dom';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

import {user} from '../data';

function UserContainer() {
	const theme = useTheme();
	const {mode} = theme.palette;

	const {id} = useParams();

	return (
		<Box class='flex py-2 px-80 gap-[40px] font-source'>
			{/* USER AVATAR */}
			<Avatar
				alt={user.username}
				src={user.profilePic || user.username[0]}
				sx={{width: 200, height: 200}}
			/>

			{/* CONTAINER RIGHT OF USER AVATAR */}
			<Box class='flex flex-col gap-[20px]'>
				{/* TOP PART OF CONTAINER */}
				<Box class='flex gap-[20px] items-center'>
					{/* USERNAME */}
					<Typography class='font-playfair text-3xl'>{user.username}</Typography>

					{/* EDIT PROFILE OR ADD FRIEND BUTTON */}
					{Number(id) === user.id ? (
						<Button
							variant={mode === 'dark' ? 'outlined' : 'contained'}
							color='secondary'
							startIcon={<SettingsOutlinedIcon />}
						>
							Edit Profile
						</Button>
					) : (
						<Button
							variant={mode === 'dark' ? 'outlined' : 'contained'}
							color='secondary'
							startIcon={<PersonAddOutlinedIcon />}
						>
							Add Friend
						</Button>
					)}
				</Box>

				{/* BOTTOM PART OF CONTAINER */}
				<Box class='flex gap-[40px] items-center'>
					{/* USER POSTS */}
					<Box class='flex gap-[7px] text-xl items-baseline'>
						<Typography class='font-black'>{user.posts}</Typography>{' '}
						<Typography>posts</Typography>
					</Box>

					{/* USER LIKES */}
					<Box class='flex gap-[7px] text-xl items-baseline'>
						<Typography class='font-black'>{user.likes}</Typography>{' '}
						<Typography>likes</Typography>
					</Box>

					{/* USER COMMENTS */}
					<Box class='flex gap-[7px] text-xl items-baseline'>
						<Typography class='font-black'>{user.comments}</Typography>{' '}
						<Typography>comments</Typography>
					</Box>
				</Box>

				{/* USER DESCRIPTION */}
				<Typography>{user.desc}</Typography>
			</Box>
		</Box>
	);
}

export default UserContainer;
