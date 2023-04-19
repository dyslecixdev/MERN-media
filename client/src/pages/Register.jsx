// REGISTER PAGE

import {useState} from 'react';
import {Link} from 'react-router-dom';

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import DarkLogo from '../assets/logo-text-dark.png';
import LightLogo from '../assets/logo-text-white.png';

function Register() {
	const theme = useTheme();
	const {mode} = theme.palette;

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Hides or reveals the password.
	const handleClickShowPassword = () => setShowPassword(show => !show);

	// Hides or reveals the confirm password.
	const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

	return (
		<Container class='min-h-[100vh] flex justify-center items-center font-source'>
			{/* REGISTER BOX */}
			<Box class='w-full md:w-[80%] lg:w-[50%] flex rounded-md min-h-[600px] overflow-hidden'>
				{/* LEFT SIDE OF BOX */}
				<Box class='flex-1 p-4 md:border-t-2 md:border-l-2 md:border-b-2 flex flex-col items-center'>
					{/* LOGO */}
					<Box
						component='img'
						src={mode === 'dark' ? DarkLogo : LightLogo}
						alt='logo'
						class='h-[150px] w-[200px] object-cover'
					></Box>

					{/* REGISTER FORM */}
					<Paper component='form' class='flex flex-col bg-transparent gap-[30px]'>
						{/* USERNAME INPUT */}
						<TextField label='Username' variant='filled' color='secondary' />

						{/* EMAIL INPUT */}
						<TextField label='Email' variant='filled' color='secondary' />

						{/* PASSWORD INPUT */}
						<FormControl variant='filled' color='secondary'>
							<InputLabel htmlFor='filled-adornment-password'>Password</InputLabel>
							<FilledInput
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											edge='end'
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
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

						<Box class='flex gap-[20px] items-center w-full'>
							{/* ADD PHOTO BUTTON */}
							<Fab color='secondary'>
								<AddAPhotoOutlinedIcon />
							</Fab>

							{/* REGISTER BUTTON */}
							<Button
								variant='contained'
								type='submit'
								color='secondary'
								sx={{width: '70%'}}
							>
								Register
							</Button>
						</Box>
					</Paper>

					{/* TEXT FOR SMALL VIEWPORTS */}
					<Typography class='text-lg mt-4 md:hidden'>
						Already have an account? Click{' '}
						<Link to='/login' class='text-orange'>
							here
						</Link>
						.
					</Typography>
				</Box>

				{/* RIGHT SIDE OF BOX */}
				<Box class='bg-register-crowd flex-1 bg-cover p-5 md:flex hidden'>
					{/* TEXT */}
					<Box class='h-fit flex flex-col justify-center gap-[10px] bg-transparent-black text-white rounded-md p-4'>
						<Typography class='text-5xl'>Hello World</Typography>
						<Typography class='font-playfair'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt temporibus
							officia numquam eveniet, ullam, voluptatem nostrum eum totam nobis,
							magni sit. Aliquam saepe ducimus incidunt. Unde ad quae doloribus autem?
						</Typography>
						<Typography class='text-lg'>
							Already have an account? Click{' '}
							<Link to='/login' class='text-orange'>
								here
							</Link>
							.
						</Typography>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}

export default Register;
