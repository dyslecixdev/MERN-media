// USER CONTAINER

import {useState} from 'react';
import {useParams} from 'react-router-dom';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import {user} from '../data';

function UserContainer() {
	const theme = useTheme();
	const {mode} = theme.palette;

	const {id} = useParams();

	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Hides or reveals the password.
	const handleClickShowPassword = () => setShowPassword(show => !show);

	// Hides or reveals the confirm password.
	const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

	// Opens the modal.
	const handleModalOpen = () => setOpen(true);

	// Closes the modal.
	const handleModalClose = () => setOpen(false);

	return (
		<Box class='flex flex-col sm:flex-row items-center py-2 md:px-20 lg:px-40 xl:px-80 gap-[20px] md:gap-[40px] font-source'>
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
							onClick={handleModalOpen}
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

			{/* USER EDIT MODAL */}
			<Modal open={open} onClose={handleModalClose}>
				<Box class='h-screen w-screen flex justify-center items-center'>
					<Box
						class={`h-[700px] w-[550px] p-4 rounded-lg flex flex-col items-end gap-[30px] ${
							mode === 'dark' ? 'bg-black' : 'bg-white'
						}`}
					>
						{/* CLOSE MODAL BUTTON */}
						<IconButton onClick={handleModalClose}>
							<CloseOutlinedIcon />
						</IconButton>

						{/* EDIT FORM */}
						<Paper
							component='form'
							class='h-full w-full flex-col flex bg-transparent gap-[30px]'
						>
							{/* INPUTS */}
							<Box class='flex flex-col gap-[40px] h-[90%] w-full justify-between flex-8'>
								{/* USERNAME AND DESC INPUTS */}
								<Box class='flex-1 flex flex-col justify-between'>
									{/* USERNAME INPUTS */}
									<TextField
										label='Username'
										variant='filled'
										color='secondary'
									/>

									{/* DESC INPUTS */}
									<TextField
										label='Description'
										variant='filled'
										color='secondary'
										multiline
										rows={5}
									/>
								</Box>

								{/* EMAIL, PASSWORD, AND CONFIRM PASSWORD INPUTS */}
								<Box class='flex flex-col flex-1 justify-between'>
									{/* EMAIL INPUT */}
									<TextField label='Email' variant='filled' color='secondary' />

									{/* PASSWORD INPUT */}
									<FormControl variant='filled' color='secondary'>
										<InputLabel htmlFor='filled-adornment-password'>
											Password
										</InputLabel>
										<FilledInput
											type={showPassword ? 'text' : 'password'}
											endAdornment={
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowPassword}
														edge='end'
													>
														{showPassword ? (
															<VisibilityOff />
														) : (
															<Visibility />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
									</FormControl>

									{/* CONFIRM PASSWORD INPUT */}
									<FormControl variant='filled' color='secondary'>
										<InputLabel htmlFor='filled-adornment-password'>
											Confirm Password
										</InputLabel>
										<FilledInput
											type={showConfirmPassword ? 'text' : 'password'}
											endAdornment={
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowConfirmPassword}
														edge='end'
													>
														{showConfirmPassword ? (
															<VisibilityOff />
														) : (
															<Visibility />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
									</FormControl>
								</Box>
							</Box>

							{/* BUTTONS */}
							<Box class='flex gap-[20px] flex-1'>
								{/* ADD PHOTO BUTTON */}
								<Fab color='secondary'>
									<AddAPhotoOutlinedIcon />
								</Fab>

								{/* UPDATE BUTTON */}
								<Button variant='contained' type='submit' color='info'>
									Update
								</Button>
							</Box>
						</Paper>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
}

export default UserContainer;
