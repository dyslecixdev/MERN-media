// USER POSTS

import {useParams} from 'react-router-dom';

import {useQuery} from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Post from './Post';

import axios from 'axios';

import {GET_POST_URL} from '../urls';

function UserPosts() {
	const {id} = useParams();

	// Gets all the posts this user created.
	const {isLoading, error, data} = useQuery({
		queryKey: ['posts', id],
		queryFn: () =>
			axios
				.get(GET_POST_URL(id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	return (
		<Box class='md:p-8'>
			{/* POSTS GRID CONTAINER */}
			{error ? (
				<Typography class='text-red text-playfair text-lg'>
					Something went wrong!
				</Typography>
			) : isLoading ? (
				<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
			) : (
				<Box class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8'>
					{data.map(post => (
						<Post post={post} grid={true} key={post.id} />
					))}
				</Box>
			)}
		</Box>
	);
}

export default UserPosts;
