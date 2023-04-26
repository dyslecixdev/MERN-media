// MESSAGE CONTAINER

import {useContext, useState} from 'react';

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

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import {AuthContext} from '../contexts/authContext';
import {ColorModeContext} from '../theme';

function MessageContainer() {
	const {currentUser} = useContext(AuthContext);

	const theme = useTheme();
	const {mode} = theme.palette;
	const colorMode = useContext(ColorModeContext);

	return (
		<Box
			class={`w-full h-[85vh] mt-4 border-2 border-solid rounded-lg border-blue flex flex-col ${
				mode === 'dark' ? 'bg-black' : 'bg-white'
			}`}
		>
			<Box class='flex-9 p-4'>Hello</Box>
			<Box class='flex-1 m-4 border-2 rounded-full flex justify-center items-center'>
				<FormControl sx={{width: '100%', paddingLeft: '15px'}}>
					<Input
						disableUnderline={true}
						endAdornment={
							<Tooltip title='Not functional' placement='right'>
								<IconButton>
									<SendOutlinedIcon />
								</IconButton>
							</Tooltip>
						}
					/>
				</FormControl>
			</Box>
		</Box>
	);
}

export default MessageContainer;
