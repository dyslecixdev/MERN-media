// LEFTBAR

import {useContext} from 'react';
import {Link} from 'react-router-dom';

import {useQuery} from '@tanstack/react-query';

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

import {AuthContext} from '../contexts/authContext';

import axios from 'axios';

import {QUERY_USER_URL, GET_POST_URL, USER_LIKE_URL, USER_COMMENT_URL} from '../urls';

function Leftbar() {
	const {currentUser} = useContext(AuthContext);

	const theme = useTheme();
	const {mode} = theme.palette;

	// Fetching the logged in user.
	const {
		isLoading: userIsLoading,
		error: userError,
		data: userData
	} = useQuery({
		queryKey: ['user', currentUser.id],
		queryFn: () =>
			axios
				.get(QUERY_USER_URL(currentUser.id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Fetching this user's posts.
	const {
		isLoading: userPostsIsLoading,
		error: userPostsError,
		data: userPostsData
	} = useQuery({
		queryKey: ['posts', currentUser.id],
		queryFn: () =>
			axios
				.get(GET_POST_URL(currentUser.id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Fetching this user's likes.
	const {
		isLoading: userLikesIsLoading,
		error: userLikesError,
		data: userLikesData
	} = useQuery({
		queryKey: ['likes', currentUser.id],
		queryFn: () =>
			axios
				.get(USER_LIKE_URL(currentUser.id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Fetching this user's comments.
	const {
		isLoading: userCommentsIsLoading,
		error: userCommentsError,
		data: userCommentsData
	} = useQuery({
		queryKey: ['comments', currentUser.id],
		queryFn: () =>
			axios
				.get(USER_COMMENT_URL(currentUser.id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	return (
		<Box class='h-full flex-2 hidden lg:block sticky top-20 font-source'>
			{userError ? (
				<Typography class='text-red text-playfair text-lg'>
					Something went wrong!
				</Typography>
			) : userIsLoading ? (
				<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
			) : (
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
							alt={userData.username}
							src={
								process.env.PUBLIC_URL + '/upload/' + userData.profilePic ||
								userData.username[0]
							}
							sx={{height: '100px', width: '100px'}}
						/>

						{/* USERNAME */}
						<Typography
							component={Link}
							to={`/profile/${currentUser.id}`}
							class='font-playfair text-2xl hover:text-blue transition-colors ease-out'
						>
							{userData.username}
						</Typography>

						{/* USER DESCRIPTION */}
						<Typography class='text-sm pb-4 font-source font-medium'>
							{userData.desc}
						</Typography>
					</Box>

					{/* BOTTOM HALF OF LEFTBAR */}
					<Box>
						<List>
							{/* USER POSTS */}
							{userPostsError ? (
								<Typography class='text-red text-playfair text-lg'>
									Something went wrong!
								</Typography>
							) : userPostsIsLoading ? (
								<Typography class='text-green text-playfair text-lg'>
									Loading...
								</Typography>
							) : (
								<ListItem>
									<ListItemIcon sx={{color: 'purple'}}>
										<ModeOutlinedIcon />
									</ListItemIcon>
									<ListItemText
										primary={userPostsData.length === 1 ? 'Post' : 'Posts'}
										secondary={userPostsData.length}
									/>
								</ListItem>
							)}

							{/* USER LIKES */}
							{userLikesError ? (
								<Typography class='text-red text-playfair text-lg'>
									Something went wrong!
								</Typography>
							) : userLikesIsLoading ? (
								<Typography class='text-green text-playfair text-lg'>
									Loading...
								</Typography>
							) : (
								<ListItem>
									<ListItemIcon sx={{color: 'red'}}>
										<FavoriteBorderOutlinedIcon />
									</ListItemIcon>
									<ListItemText
										primary={userLikesData.length === 1 ? 'Like' : 'Likes'}
										secondary={userLikesData.length}
									/>
								</ListItem>
							)}

							{/* USER COMMENTS */}
							{userCommentsError ? (
								<Typography class='text-red text-playfair text-lg'>
									Something went wrong!
								</Typography>
							) : userCommentsIsLoading ? (
								<Typography class='text-green text-playfair text-lg'>
									Loading...
								</Typography>
							) : (
								<ListItem>
									<ListItemIcon sx={{color: 'green'}}>
										<MessageOutlinedIcon />
									</ListItemIcon>
									<ListItemText
										primary={
											userCommentsData.length === 1 ? 'Comment' : 'Comments'
										}
										secondary={userCommentsData.length}
									/>
								</ListItem>
							)}
						</List>
					</Box>
				</Box>
			)}
		</Box>
	);
}

export default Leftbar;
