// COMMENTS CONTAINER

import {useState} from 'react';

import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import axios from 'axios';
import moment from 'moment';

import {COMMENT_URL, GET_COMMENT_URL} from '../urls';

function Comments({postId, open, grid}) {
	const theme = useTheme();
	const {mode} = theme.palette;

	const queryClient = useQueryClient();

	const [desc, setDesc] = useState('');

	// Fetching this post's comments data.
	const {isLoading, error, data} = useQuery({
		queryKey: ['comments', postId],
		queryFn: () =>
			axios
				.get(GET_COMMENT_URL(postId), {
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

	// Creates a comment.
	const handleClick = async e => {
		e.preventDefault();

		mutation.mutate({desc, postId: postId});

		setDesc('');
	};

	return (
		open && (
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
								// bug Moment text overlaps message text.
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
								<ListItemText primary={comment.username} secondary={comment.desc} />
							</ListItem>
						))}
					</List>
				)}
			</Box>
		)
	);
}

export default Comments;
