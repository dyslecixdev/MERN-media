// EDIT USER MODAL

import {useContext, useState} from 'react';

import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import {AuthContext} from '../contexts/authContext';

import axios from 'axios';

import {QUERY_USER_URL, FILE_URL} from '../urls';

function EditUserModal({handleModalClose, open}) {
	const {currentUser} = useContext(AuthContext);

	const theme = useTheme();
	const {mode} = theme.palette;

	const queryClient = useQueryClient();

	const [inputs, setInputs] = useState({
		username: '',
		desc: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [profilePic, setProfilePic] = useState(null);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Gets the user's info again after mutating existing data.
	const mutation = useMutation({
		mutationFn: editUser => {
			return axios.put(QUERY_USER_URL(currentUser.id), editUser, {
				withCredentials: true
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['user']});
		}
	});

	// Handles input changes.
	const handleChange = e => {
		setInputs(prev => ({...prev, [e.target.name]: [e.target.value]}));
	};

	// Uploads a user's profilePic.
	const upload = async () => {
		try {
			const formData = new FormData();
			formData.append('file', profilePic);
			const res = await axios.post(FILE_URL, formData, {
				withCredentials: true
			});
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};

	// Hides or reveals the password.
	const handleClickShowPassword = () => setShowPassword(show => !show);

	// Hides or reveals the confirm password.
	const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

	// Updates a user.
	const handleUpdateUser = async e => {
		e.preventDefault();

		let profilePicUrl = '';
		if (profilePic) profilePicUrl = await upload();

		mutation.mutate({...inputs, profilePic: profilePicUrl});

		handleModalClose();
		setInputs({
			username: '',
			desc: '',
			email: '',
			password: '',
			confirmPassword: ''
		});
		setProfilePic(null);
	};

	return (
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
									name='username'
									value={inputs.username}
									onChange={handleChange}
									variant='filled'
									color='secondary'
								/>

								{/* DESC INPUTS */}
								<TextField
									label='Description'
									name='desc'
									value={inputs.desc}
									onChange={handleChange}
									variant='filled'
									color='secondary'
									multiline
									rows={5}
								/>
							</Box>

							{/* EMAIL, PASSWORD, AND CONFIRM PASSWORD INPUTS */}
							<Box class='flex flex-col flex-1 justify-between'>
								{/* EMAIL INPUT */}
								<TextField
									label='Email'
									name='email'
									value={inputs.email}
									onChange={handleChange}
									variant='filled'
									color='secondary'
								/>

								{/* PASSWORD INPUT */}
								<FormControl variant='filled' color='secondary'>
									<InputLabel htmlFor='filled-adornment-password'>
										Password
									</InputLabel>
									<FilledInput
										name='password'
										value={inputs.password}
										onChange={handleChange}
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
										name='confirmPassword'
										value={inputs.confirmPassword}
										onChange={handleChange}
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
							{/* ADD PROFILE PICTURE BUTTON */}
							<IconButton component='label' htmlFor='profilePic'>
								{!profilePic && <AddAPhotoOutlinedIcon />}
								{profilePic && (
									<Avatar
										alt='profilePic'
										src={URL.createObjectURL(profilePic)}
										sx={{width: 24, height: 24}}
									/>
								)}
								<input
									id='profilePic'
									type='file'
									hidden
									onChange={e => setProfilePic(e.target.files[0])}
								/>
							</IconButton>

							{/* UPDATE BUTTON */}
							<Button
								onClick={handleUpdateUser}
								variant='contained'
								type='submit'
								color='info'
							>
								Update
							</Button>
						</Box>
					</Paper>
				</Box>
			</Box>
		</Modal>
	);
}

export default EditUserModal;
