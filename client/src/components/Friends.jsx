// FRIENDS LIST

import {useContext} from 'react';
import {Link} from 'react-router-dom';

import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';

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

import {QUERY_RELATIONSHIP_URL} from '../urls';

import {friends} from '../data';

function Friends() {
	const {currentUser} = useContext(AuthContext);

	const queryClient = useQueryClient();

	// todo Fetching logged in user's relationships.
	const {isLoading, error, data} = useQuery({
		queryKey: ['relationship', currentUser.id],
		queryFn: () =>
			axios
				.get(QUERY_RELATIONSHIP_URL(currentUser.id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	console.log(data);

	return (
		<Box class='h-full w-full flex flex-col gap-[20px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue scrollbar-track-transparent'>
			{/* TITLE */}
			<Typography class='font-playfair text-2xl self-center'>Friends</Typography>

			{/* FRIENDS LIST */}
			<List>
				{friends.map(friend => (
					<ListItem key={friend.id}>
						<ListItemButton component={Link} to={`/profile/${friend.id}`}>
							<ListItemAvatar>
								<Avatar
									alt={friend.username}
									src={friend.profilePic || friend.username[0]}
								/>
							</ListItemAvatar>
							<ListItemText primary={friend.username} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
}

export default Friends;
