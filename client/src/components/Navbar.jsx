// NAVBAR

import {useContext, useState} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom';

import {useQuery} from '@tanstack/react-query';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import Logo from '../assets/logo.png';

import {AuthContext} from '../contexts/authContext';
import {ColorModeContext} from '../theme';

import axios from 'axios';

import {QUERY_USER_URL} from '../urls';

function Navbar() {
	const {currentUser} = useContext(AuthContext);
	const {logout} = useContext(AuthContext);

	const theme = useTheme();
	const {mode} = theme.palette;
	const colorMode = useContext(ColorModeContext);

	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);

	// Fetching the logged in user.
	const {isLoading, error, data} = useQuery({
		queryKey: ['user', currentUser.id],
		queryFn: () =>
			axios
				.get(QUERY_USER_URL(currentUser.id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Opens the avatar menu.
	const handleMenuOpen = e => {
		setAnchorEl(e.currentTarget);
	};

	// Closes the avatar menu.
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// Logs out a user.
	const handleClick = async () => {
		handleMenuClose();

		localStorage.clear('user');

		try {
			await logout();
			navigate('/login');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box>
			{/* NAVBAR */}
			<Box
				class={`h-[70px] font-source flex justify-between items-center px-8 sticky top-0 z-[1000] border-b-8 ${
					mode === 'dark' ? 'bg-black border-light-black' : 'bg-white border-off-white'
				}`}
			>
				{/* LEFT SIDE OF NAVBAR */}
				<Box class='flex gap-[30px] items-center'>
					{/* LOGO */}
					<Box component={Link} to='/'>
						<Box
							component='img'
							src={Logo}
							alt='logo'
							class='h-[9.5vh] w-fit object-cover'
						/>
					</Box>

					{/* SEARCH INPUT */}
					<Box class='border-2 w-[260px] pl-4 hidden sm:block rounded-full'>
						<FormControl>
							<Input
								disableUnderline={true}
								endAdornment={
									<Tooltip title='Not functional' placement='right'>
										<IconButton>
											<SearchIcon />
										</IconButton>
									</Tooltip>
								}
							/>
						</FormControl>
					</Box>
				</Box>

				{/* RIGHT SIDE OF NAVBAR */}
				<Box class='flex gap-[20px] items-center'>
					{/* LIGHT/DARK MODE ICONS */}
					<IconButton onClick={colorMode.toggleColorMode}>
						{mode === 'dark' ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
					</IconButton>

					{/* CHAT ICON */}
					<IconButton component={Link} to='/chatroom'>
						<ChatBubbleOutlineOutlinedIcon />
					</IconButton>

					{/* USER AVATAR */}
					{error ? (
						<Typography class='text-red text-playfair text-lg'>
							Something went wrong!
						</Typography>
					) : isLoading ? (
						<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
					) : (
						<IconButton onClick={handleMenuOpen}>
							<Avatar
								alt={data.username}
								src={
									process.env.PUBLIC_URL + '/upload/' + data.profilePic ||
									data.username[0]
								}
								sx={{
									border: mode === 'dark' ? '2px solid white' : '2px solid black'
								}}
							/>
						</IconButton>
					)}

					{/* AVATAR MENU */}
					<Menu
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						{/* PROFILE LINK */}
						<MenuItem
							onClick={handleMenuClose}
							component={Link}
							to={`/profile/${currentUser.id}`}
						>
							<ListItemIcon>
								<PersonOutlineOutlinedIcon fontSize='small' />
							</ListItemIcon>
							<ListItemText>Profile</ListItemText>
						</MenuItem>

						{/* LOGOUT LINK */}
						<MenuItem onClick={handleClick}>
							<ListItemIcon>
								<LogoutOutlinedIcon fontSize='small' />
							</ListItemIcon>
							<ListItemText>Logout</ListItemText>
						</MenuItem>
					</Menu>
				</Box>
			</Box>

			{/* EVERYTHING BELOW THE NAVBAR */}
			<Outlet />
		</Box>
	);
}

export default Navbar;
