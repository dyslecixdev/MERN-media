// POST

import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';

import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import {AuthContext} from '../contexts/authContext';

import axios from 'axios';
import moment from 'moment';

import {LIKE_URL, POST_LIKE_URL, DELETE_LIKE_URL, DELETE_POST_URL} from '../urls';

import Comments from './Comments';

function Post({post, grid}) {
	const {currentUser} = useContext(AuthContext);

	const theme = useTheme();
	const {mode} = theme.palette;

	const queryClient = useQueryClient();

	const [open, setOpen] = useState(null);

	// Fetching this post's likes data.
	const {isLoading, error, data} = useQuery({
		queryKey: ['likes', post.id],
		queryFn: () =>
			axios
				.get(POST_LIKE_URL(post.id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Gets all the likes again after mutating existing data.
	const getLikeMutation = useMutation({
		mutationFn: liked => {
			// Deletes a like if the post has already been liked.
			if (liked)
				return axios.delete(DELETE_LIKE_URL(post.id), {
					withCredentials: true
				});

			// Creates a like if the post has not been liked yet.
			return axios.post(
				LIKE_URL,
				{postId: post.id},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['likes']});
		}
	});

	// Gets all the posts again after mutating existing data.
	const deletePostMutation = useMutation({
		mutationFn: postId => {
			return axios.delete(DELETE_POST_URL(postId), {
				withCredentials: true
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['posts']});
		}
	});

	// Likes or dislikes a post.
	const handleLike = () => {
		// Checks to see if the post is liked.
		getLikeMutation.mutate(data.includes(currentUser.id));
	};

	// Opens or closes a post's comments menu.
	const handleCommentsToggle = postId => {
		if (!open) setOpen(postId);
		else setOpen(null);
	};

	// Deletes a post.
	const handleClick = () => {
		deletePostMutation.mutate(post.id);
	};

	return (
		<Box
			class={`h-content w-full rounded-md flex flex-col p-4 ${
				grid && 'justify-between'
			} gap-[20px] font-source ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}
		>
			{/* FIRST ROW */}
			<Box class='flex justify-between items-center'>
				<Box class='flex gap-[20px] items-center'>
					{/* POST USER AVATAR */}
					<Avatar
						alt={post.username}
						src={
							process.env.PUBLIC_URL + '/upload/' + post.profilePic ||
							post.username[0]
						}
					/>

					{/* POST USERNAME */}
					<Typography
						component={Link}
						to={`/profile/${post.userId}`}
						class='font-playfair text-lg hover:text-blue transition-colors ease-out'
					>
						{post.username}
					</Typography>
				</Box>

				<Typography>{moment(post.createdAt).fromNow()}</Typography>
			</Box>

			{/* SECOND ROW */}
			<Box class='border-t-2 border-b-2 p-2 flex flex-col gap-[10px]'>
				{/* POST MESSAGE */}
				{post.message && <Typography>{post.message}</Typography>}

				{/* POST PICTURE */}
				{post.picture && (
					<Box
						component='img'
						// Example of getting the picture from the public folder.
						src={process.env.PUBLIC_URL + '/upload/' + post.picture}
						alt='post picture'
						class='h-full w-full'
					/>
				)}
			</Box>

			{/* THIRD ROW */}
			<Box class='flex gap-[20px] flex-col sm:flex-row'>
				{/* LIKES BUTTON */}
				{error ? (
					<Typography class='text-red text-playfair text-lg'>
						Something went wrong!
					</Typography>
				) : isLoading ? (
					<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
				) : (
					<Button
						onClick={handleLike}
						variant={mode === 'dark' ? 'outlined' : 'contained'}
						color={data.includes(currentUser.id) ? 'error' : 'secondary'}
						startIcon={<FavoriteBorderOutlinedIcon />}
					>
						{data.length} {data.length === 1 ? 'Like' : 'Likes'}
					</Button>
				)}

				{/* COMMENTS BUTTON */}
				<Button
					variant={mode === 'dark' ? 'outlined' : 'contained'}
					color='success'
					startIcon={<MessageOutlinedIcon />}
					onClick={() => handleCommentsToggle(post.id)}
				>
					Comments
				</Button>
			</Box>

			{/* DELETE BUTTON */}
			{grid && post.userId === currentUser.id && (
				<Button
					variant={mode === 'dark' ? 'outlined' : 'contained'}
					color='info'
					startIcon={<DeleteOutlineOutlinedIcon />}
					onClick={handleClick}
				>
					Delete
				</Button>
			)}

			{/* COMMENTS CONTAINER */}
			<Comments postId={post.id} open={open} grid={grid} />
		</Box>
	);
}

export default Post;
