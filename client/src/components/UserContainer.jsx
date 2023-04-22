// USER CONTAINER

import {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';

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

import {AuthContext} from '../contexts/authContext';

import axios from 'axios';

import {GET_USER_URL, QUERY_RELATIONSHIP_URL, RELATIONSHIP_URL} from '../urls';

function UserContainer() {
	const {currentUser} = useContext(AuthContext);

	const theme = useTheme();
	const {mode} = theme.palette;

	const {id} = useParams();

	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Fetching this user.
	// Since I have two of these fetching functions, I renamed the isLoading, error, and data to avoid confusion.
	const {
		isLoading: userIsLoading,
		error: userError,
		data: userData
	} = useQuery({
		queryKey: ['user', id],
		queryFn: () =>
			axios
				.get(GET_USER_URL(id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Fetching logged in user's relationships.
	const {
		isLoading: relationshipIsLoading,
		error: relationshipError,
		data: relationshipData
	} = useQuery({
		queryKey: ['relationship', id],
		queryFn: () =>
			axios
				.get(QUERY_RELATIONSHIP_URL(id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Gets all the relationships again after mutating existing data.
	const mutation = useMutation({
		mutationFn: following => {
			// Deletes the relationship if it already exists.
			if (following)
				return axios.delete(QUERY_RELATIONSHIP_URL(id), {
					withCredentials: true
				});
			// Creates a relationship if it does not exist.
			return axios.post(
				RELATIONSHIP_URL,
				{userId: id},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['relationship']});
		}
	});

	// Hides or reveals the password.
	const handleClickShowPassword = () => setShowPassword(show => !show);

	// Hides or reveals the confirm password.
	const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

	// Opens the modal.
	const handleModalOpen = () => setOpen(true);

	// Closes the modal.
	const handleModalClose = () => setOpen(false);

	// Creates or deletes a relationship.
	const handleAddFriend = () => {
		mutation.mutate(relationshipData.includes(currentUser.id));
	};

	return (
		<Box class='flex flex-col sm:flex-row items-center py-2 md:px-20 lg:px-40 xl:px-80 gap-[20px] md:gap-[40px] font-source'>
			{/* USER AVATAR */}
			{userError ? (
				<Typography class='text-red text-playfair text-lg'>
					Something went wrong!
				</Typography>
			) : userIsLoading ? (
				<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
			) : (
				<Avatar
					alt={userData.username}
					src={userData.profilePic || userData.username[0]}
					sx={{width: 200, height: 200}}
				/>
			)}

			{/* CONTAINER RIGHT OF USER AVATAR */}
			{userError ? (
				<Typography class='text-red text-playfair text-lg'>
					Something went wrong!
				</Typography>
			) : userIsLoading ? (
				<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
			) : (
				<Box class='flex flex-col gap-[20px]'>
					{/* TOP PART OF CONTAINER */}
					<Box class='flex gap-[20px] items-center'>
						{/* USERNAME */}
						<Typography class='font-playfair text-3xl'>{userData.username}</Typography>

						{Number(id) === currentUser.id ? (
							// EDIT PROFILE BUTTON
							<Button
								onClick={handleModalOpen}
								variant={mode === 'dark' ? 'outlined' : 'contained'}
								color='secondary'
								startIcon={<SettingsOutlinedIcon />}
							>
								Edit Profile
							</Button>
						) : relationshipError ? (
							<Typography class='text-red text-playfair text-lg'>
								Something went wrong!
							</Typography>
						) : relationshipIsLoading ? (
							<Typography class='text-green text-playfair text-lg'>
								Loading...
							</Typography>
						) : (
							// FOLLOWING OR ADD FRIEND BUTTON
							<Button
								onClick={handleAddFriend}
								variant={mode === 'dark' ? 'outlined' : 'contained'}
								color='secondary'
								startIcon={<PersonAddOutlinedIcon />}
							>
								{relationshipData.includes(currentUser.id)
									? 'Following Friend'
									: 'Add Friend'}
							</Button>
						)}
					</Box>

					{/* BOTTOM PART OF CONTAINER */}
					<Box class='flex gap-[40px] items-center'>
						{/* USER POSTS */}
						<Box class='flex gap-[7px] text-xl items-baseline'>
							{/* todo */}
							<Typography class='font-black'>
								{currentUser.posts || 0}
							</Typography>{' '}
							<Typography>posts</Typography>
						</Box>

						{/* USER LIKES */}
						<Box class='flex gap-[7px] text-xl items-baseline'>
							{/* todo */}
							<Typography class='font-black'>
								{currentUser.likes || 0}
							</Typography>{' '}
							<Typography>likes</Typography>
						</Box>

						{/* USER COMMENTS */}
						<Box class='flex gap-[7px] text-xl items-baseline'>
							{/* todo */}
							<Typography class='font-black'>
								{currentUser.comments || 0}
							</Typography>{' '}
							<Typography>comments</Typography>
						</Box>
					</Box>

					{/* USER'S NAME */}
					<Typography>{userData.name}</Typography>

					{/* USER DESCRIPTION */}
					<Typography>{userData.desc}</Typography>
				</Box>
			)}

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
