// LOGIN PAGE

import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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

import DarkLogo from '../assets/logo-text-dark.png';
import LightLogo from '../assets/logo-text-white.png';

import {AuthContext} from '../contexts/authContext';

function Login() {
	const navigate = useNavigate();

	const theme = useTheme();
	const {mode} = theme.palette;

	const {login} = useContext(AuthContext);

	const [inputs, setInputs] = useState({
		email: '',
		password: ''
	});
	const [err, setErr] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	// Handles input changes.
	const handleChange = e => {
		setInputs(prevInputs => ({...prevInputs, [e.target.name]: e.target.value}));
	};

	// Hides or reveals the password.
	const handleClickShowPassword = () => setShowPassword(show => !show);

	// Logs in a user using the inputs.
	const handleClick = async e => {
		e.preventDefault();

		try {
			await login(inputs);
			navigate('/');
		} catch (err) {
			setErr(err.response.data);
		}
	};

	return (
		<Container class='min-h-[100vh] flex justify-center items-center font-source'>
			{/* LOGIN BOX */}
			<Box class='w-full md:w-[80%] lg:w-[50%] flex rounded-md min-h-[600px] overflow-hidden'>
				{/* LEFT SIDE OF BOX */}
				<Box class='bg-login-crowd flex-1 bg-cover p-5 md:flex hidden'>
					{/* TEXT */}
					<Box class='h-fit flex flex-col justify-center gap-[30px] bg-transparent-black text-white rounded-md p-4'>
						<Typography class='text-5xl'>Hello World</Typography>
						<Typography class='font-playfair'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt temporibus
							officia numquam eveniet, ullam, voluptatem nostrum eum totam nobis,
							magni sit. Aliquam saepe ducimus incidunt. Unde ad quae doloribus autem?
						</Typography>
						<Typography class='text-lg'>
							Don't have an account? Click{' '}
							<Link to='/register' class='text-light-blue'>
								here
							</Link>
							.
						</Typography>
					</Box>
				</Box>

				{/* RIGHT SIDE OF BOX */}
				<Box class='flex-1 p-4 md:border-t-2 md:border-r-2 md:border-b-2 flex flex-col items-center'>
					{/* LOGO */}
					<Box
						component='img'
						src={mode === 'dark' ? DarkLogo : LightLogo}
						alt='logo'
					></Box>

					{/* LOGIN FORM */}
					<Paper component='form' class='flex flex-col bg-transparent gap-[60px]'>
						{/* EMAIL INPUT */}
						<TextField
							label='Email'
							name='email'
							onChange={handleChange}
							variant='filled'
							color='secondary'
						/>

						{/* PASSWORD INPUT */}
						<FormControl variant='filled' color='secondary'>
							<InputLabel htmlFor='filled-adornment-password'>Password</InputLabel>
							<FilledInput
								name='password'
								onChange={handleChange}
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

						{/* ERROR MESSAGE */}
						{err && (
							<Typography class='text-red text-playfair text-lg'>{err}</Typography>
						)}

						{/* LOGIN BUTTON */}
						<Button
							onClick={handleClick}
							variant='contained'
							type='submit'
							color='secondary'
						>
							Login
						</Button>
					</Paper>

					{/* TEXT FOR SMALL VIEWPORTS */}
					<Typography class='text-lg mt-12 md:hidden'>
						Don't have an account? Click{' '}
						<Link to='/register' class='text-light-blue'>
							here
						</Link>
						.
					</Typography>
				</Box>
			</Box>
		</Container>
	);
}

export default Login;
