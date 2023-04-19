// POST

import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';

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

import {AuthContext} from '../contexts/authContext';

function Post({post, grid}) {
	const {currentUser} = useContext(AuthContext);

	const theme = useTheme();
	const {mode} = theme.palette;

	const [open, setOpen] = useState(null);

	// Opens or closes a post's comments menu.
	const handleCommentsToggle = postId => {
		if (!open) setOpen(postId);
		else setOpen(null);
	};

	return (
		<Box
			class={`h-content w-full rounded-md flex flex-col p-4 ${
				grid && 'justify-between'
			} gap-[20px] font-source ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}
		>
			{/* FIRST ROW */}
			<Box class='flex gap-[20px] items-center'>
				{/* POST USER AVATAR */}
				<Avatar alt={post.user} src={post.profilePic || post.user[0]} />

				{/* POST USERNAME */}
				<Typography
					component={Link}
					to={`/profile/${currentUser.id}`}
					class='font-playfair text-lg hover:text-blue transition-colors ease-out'
				>
					{post.user}
				</Typography>
			</Box>

			{/* SECOND ROW */}
			<Box class='border-t-2 border-b-2 p-2 flex flex-col gap-[10px]'>
				{/* POST MESSAGE */}
				{post.message && <Typography>{post.message}</Typography>}

				{/* POST PICTURE */}
				{post.picture && (
					<Box
						component='img'
						src={post.picture}
						alt='post image'
						class='h-full w-full'
					/>
				)}

				{/* POST VIDEO */}
				{post.video && (
					<Box component='iframe' src={post.video} class='h-content w-content' />
				)}
			</Box>

			{/* THIRD ROW */}
			<Box class='flex gap-[20px] flex-col sm:flex-row'>
				{/* LIKES BUTTON */}
				<Button
					variant={mode === 'dark' ? 'outlined' : 'contained'}
					color='error'
					startIcon={<FavoriteBorderOutlinedIcon />}
				>
					{post.likes} Likes
				</Button>

				{/* COMMENTS BUTTON */}
				<Button
					variant={mode === 'dark' ? 'outlined' : 'contained'}
					color='success'
					startIcon={<MessageOutlinedIcon />}
					onClick={() => handleCommentsToggle(post.id)}
				>
					{post.comments.length} Comments
				</Button>
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
							{/* USER AVATAR */}
							<Avatar
								alt={currentUser.username}
								src={currentUser.profilePic || currentUser.username[0]}
							/>

							{/* COMMENT INPUT */}
							<Box
								class={`border-1 w-full pl-4 rounded-full flex items-center ${
									mode === 'dark' ? 'bg-slate-blue' : 'bg-gray'
								}`}
							>
								<FormControl>
									<Input disableUnderline={true} />
								</FormControl>
							</Box>

							{/* POST BUTTON */}
							<Fab size='small' color={mode === 'dark' ? 'secondary' : 'info'}>
								<SendOutlinedIcon />
							</Fab>
						</Box>
					)}

					{/* COMMENTS CONTAINER */}
					<List>
						{post.comments.map(comment => (
							<ListItem key={comment.id}>
								{/* COMMENT USER AVATAR */}
								<ListItemAvatar>
									<Avatar
										alt={comment.profilePic}
										src={comment.profilePic || comment.user[0]}
									/>
								</ListItemAvatar>

								{/* COMMENT USERNAME AND COMMENT */}
								<ListItemText primary={comment.user} secondary={comment.comment} />
							</ListItem>
						))}
					</List>
				</Box>
			)}
		</Box>
	);
}

export default Post;
