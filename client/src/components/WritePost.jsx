// WRITE A POST

import {useContext, useState} from 'react';

import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

import {AuthContext} from '../contexts/authContext';

import axios from 'axios';

import {POST_URL, FILE_URL} from '../urls';

function WritePost() {
	const {currentUser} = useContext(AuthContext);

	const theme = useTheme();
	const {mode} = theme.palette;

	const queryClient = useQueryClient();

	const [message, setMessage] = useState('');
	const [picture, setPicture] = useState(null);

	const [open, setOpen] = useState(false);

	// Uploads a post's image.
	const upload = async () => {
		try {
			const formData = new FormData();
			formData.append('picture', picture);
			// Note the below route is in server/index.js
			const res = await axios.post(FILE_URL, formData, {
				withCredentials: true
			});
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};

	// Gets all the posts again after mutating existing data (e.g. creating or editing data).
	const mutation = useMutation({
		mutationFn: newPost => {
			return axios.post(POST_URL, newPost, {
				withCredentials: true
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['posts']});
		}
	});

	// Opens the modal.
	const handleModalOpen = () => setOpen(true);

	// Closes the modal.
	const handleModalClose = () => {
		setMessage('');
		setPicture(null);
		setOpen(false);
	};

	// Creates a post.
	const handleClick = async e => {
		e.preventDefault();

		let pictureUrl = '';
		if (picture) pictureUrl = await upload();

		mutation.mutate({message, picture: pictureUrl});

		handleModalClose();
	};

	return (
		<Box
			class={`h-content w-full rounded-md flex p-4 gap-[20px] font-source ${
				mode === 'dark' ? 'bg-black' : 'bg-white'
			}`}
		>
			{/* LOGO */}
			<Avatar
				alt={currentUser.username}
				src={currentUser.profilePic || currentUser.username[0]}
			/>

			{/* FAKE TEXT INPUT */}
			<Box
				onClick={handleModalOpen}
				class={`border-1 w-[260px] pl-4 flex rounded-full flex-9 items-center cursor-pointer ${
					mode === 'dark' ? 'bg-slate-blue' : 'bg-gray'
				}`}
			>
				<Typography>Write a Post</Typography>
			</Box>

			{/* POST MODAL */}
			<Modal open={open} onClose={handleModalClose}>
				<Box class='h-screen w-screen flex justify-center items-center'>
					<Box
						class={`h-[500px] w-[400px] p-4 rounded-lg flex flex-col gap-[25px] ${
							mode === 'dark' ? 'bg-black' : 'bg-white'
						}`}
					>
						<Box class='flex items-end justify-between'>
							{/* TEXT */}
							<Typography class='font-playfair text-xl'>Write a Post</Typography>

							{/* CLOSE MODAL BUTTON */}
							<IconButton onClick={handleModalClose}>
								<CloseOutlinedIcon />
							</IconButton>
						</Box>

						{/* USERNAME AND AVATAR */}
						<Box class='flex items-center gap-[20px]'>
							<Avatar
								alt={currentUser.username}
								src={currentUser.profilePic || currentUser.username[0]}
							/>
							<Typography>{currentUser.username}</Typography>
						</Box>

						{/* MESSAGE INPUT */}
						<TextField
							multiline
							rows={10}
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>

						<Box class='flex justify-between items-center px-8'>
							{/* EMOJI BUTTON */}
							<IconButton>
								<EmojiEmotionsOutlinedIcon />
							</IconButton>

							{/* PICTURE BUTTON */}
							<IconButton component='label' htmlFor='picture'>
								{!picture && <CameraAltOutlinedIcon />}
								{picture && (
									<Avatar
										alt='picture'
										src={URL.createObjectURL(picture)}
										sx={{width: 24, height: 24}}
									/>
								)}
								<input
									id='picture'
									type='file'
									hidden
									onChange={e => setPicture(e.target.files[0])}
								/>
							</IconButton>

							{/* VIDEO BUTTON */}
							<IconButton>
								<OndemandVideoOutlinedIcon />
							</IconButton>

							{/* POST BUTTON */}
							<Button
								onClick={handleClick}
								variant='contained'
								color='info'
								disabled={!message}
							>
								Post
							</Button>
						</Box>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
}

export default WritePost;
