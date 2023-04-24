// USERS LIST

import {useContext} from 'react';
import {Link} from 'react-router-dom';

import {useQuery} from '@tanstack/react-query';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import {AuthContext} from '../contexts/authContext';

import axios from 'axios';

import {GET_ALL_USER_URL} from '../urls';

function Users() {
	const {currentUser} = useContext(AuthContext);

	// Fetching all the users.
	const {isLoading, error, data} = useQuery({
		queryKey: ['users', currentUser.id],
		queryFn: () =>
			axios
				.get(GET_ALL_USER_URL(currentUser.id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	return (
		<Box class='h-full w-full flex flex-col gap-[20px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue scrollbar-track-transparent'>
			{/* TITLE */}
			<Typography class='font-playfair text-2xl self-center'>Users</Typography>

			{/* FRIENDS LIST */}
			{error ? (
				<Typography class='text-red text-playfair text-lg'>
					Something went wrong!
				</Typography>
			) : isLoading ? (
				<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
			) : (
				<List>
					{data.map(user => (
						<ListItem key={user.id}>
							<ListItemButton component={Link} to={`/profile/${user.id}`}>
								<ListItemAvatar>
									<Avatar
										alt={user.username}
										src={
											process.env.PUBLIC_URL + '/upload/' + user.profilePic ||
											user.username[0]
										}
									/>
								</ListItemAvatar>
								<ListItemText primary={user.username} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			)}
		</Box>
	);
}

export default Users;
