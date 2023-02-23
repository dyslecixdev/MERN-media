// WRITE A POST

import {useState} from 'react';

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

function WritePost({user}) {
	const theme = useTheme();
	const {mode} = theme.palette;

	const [message, setMessage] = useState('');
	const [open, setOpen] = useState(false);

	// Opens the modal.
	const handleModalOpen = () => setOpen(true);

	// Closes the modal.
	const handleModalClose = () => {
		setMessage('');
		setOpen(false);
	};

	return (
		<Box
			class={`h-content w-full rounded-md flex p-4 gap-[20px] font-source ${
				mode === 'dark' ? 'bg-black' : 'bg-white'
			}`}
		>
			{/* LOGO */}
			<Avatar alt={user.username} src={user.profilePic || user.username[0]} />

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
						class={`h-[500px] w-[400px] p-4 rounded-lg flex flex-col gap-[30px] ${
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
							<Avatar alt={user.username} src={user.profilePic || user.username[0]} />
							<Typography>{user.username}</Typography>
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
							<IconButton>
								<CameraAltOutlinedIcon />
							</IconButton>

							{/* VIDEO BUTTON */}
							<IconButton>
								<OndemandVideoOutlinedIcon />
							</IconButton>

							{/* POST BUTTON */}
							<Button variant='contained' color='info' disabled={!message}>
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
