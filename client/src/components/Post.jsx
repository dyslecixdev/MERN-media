// POST

import {useState} from 'react';
import {Link} from 'react-router-dom';

import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import axios from 'axios';
import moment from 'moment';

import {COMMENT_URL, GET_COMMENT_URL} from '../urls';

function Post({post, grid}) {
	console.log(post);

	const theme = useTheme();
	const {mode} = theme.palette;

	const queryClient = useQueryClient();

	const [desc, setDesc] = useState('');

	const [open, setOpen] = useState(null);

	// Fetching this post's comments data.
	const {isLoading, error, data} = useQuery({
		queryKey: ['comments', post.id],
		queryFn: () =>
			axios
				.get(GET_COMMENT_URL(post.id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Gets all the comments again after mutating existing data.
	const mutation = useMutation({
		mutationFn: newComment => {
			return axios.post(COMMENT_URL, newComment, {
				withCredentials: true
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['comments']});
		}
	});

	// Opens or closes a post's comments menu.
	const handleCommentsToggle = postId => {
		if (!open) setOpen(postId);
		else setOpen(null);
	};

	// Creates a comment.
	const handleClick = async e => {
		e.preventDefault();

		mutation.mutate({desc, postId: post.id});

		setDesc('');
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
					<Avatar alt={post.username} src={post.profilePic || post.username[0]} />

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

				{/* POST VIDEO */}
				{/* {post.video && (
					<Box component='iframe' src={post.video} class='h-content w-content' />
				)} */}
			</Box>

			{/* THIRD ROW */}
			<Box class='flex gap-[20px] flex-col sm:flex-row'>
				{/* LIKES BUTTON */}
				<Button
					variant={mode === 'dark' ? 'outlined' : 'contained'}
					color='error'
					startIcon={<FavoriteBorderOutlinedIcon />}
				>
					{/* todo */}
					{post.likes || 0} Likes
				</Button>

				{/* COMMENTS BUTTON */}
				{data && (
					<Button
						variant={mode === 'dark' ? 'outlined' : 'contained'}
						color='success'
						startIcon={<MessageOutlinedIcon />}
						onClick={() => handleCommentsToggle(post.id)}
					>
						{data.length} {data.length === 1 ? 'Comment' : 'Comments'}
					</Button>
				)}
			</Box>

			{/* COMMENTS MENU */}
			{open === post.id && (
				<Box
					class={`flex flex-col p-4 gap-[20px] font-source ${
						mode === 'dark' ? 'bg-black' : 'bg-white'
					}`}
				>
					{!grid && (
						<Box class='flex gap-[10px] items-center'>
							{/* COMMENT INPUT */}
							<Box
								class={`border-1 w-full px-4 rounded-full flex items-center ${
									mode === 'dark' ? 'bg-slate-blue' : 'bg-gray'
								}`}
							>
								<FormControl class='w-full'>
									<Input
										value={desc}
										onChange={e => setDesc(e.target.value)}
										disableUnderline={true}
										fullWidth={true}
									/>
								</FormControl>
							</Box>

							{/* POST BUTTON */}
							<Fab
								onClick={handleClick}
								disabled={!desc}
								size='small'
								color={mode === 'dark' ? 'secondary' : 'info'}
							>
								<SendOutlinedIcon />
							</Fab>
						</Box>
					)}

					{/* COMMENTS CONTAINER */}
					{error ? (
						<Typography class='text-red text-playfair text-lg'>
							Something went wrong!
						</Typography>
					) : isLoading ? (
						<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
					) : (
						<List>
							{data.map(comment => (
								<ListItem
									key={comment.id}
									secondaryAction={
										<Typography class='font-source'>
											{moment(comment.createdAt).fromNow()}
										</Typography>
									}
								>
									{/* COMMENT USER AVATAR */}
									<ListItemAvatar>
										<Avatar
											alt={comment.profilePic}
											src={comment.profilePic || comment.username[0]}
										/>
									</ListItemAvatar>

									{/* COMMENT USERNAME AND COMMENT */}
									<ListItemText
										primary={comment.username}
										secondary={comment.desc}
									/>
								</ListItem>
							))}
						</List>
					)}
				</Box>
			)}
		</Box>
	);
}

export default Post;
