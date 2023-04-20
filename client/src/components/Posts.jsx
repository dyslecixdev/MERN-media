// POSTS

import {useState} from 'react';

import {useQuery} from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from 'axios';

import {POST_URL} from '../urls';

import Post from './Post';

function Posts() {
	// Provides an isLoading state, error, and data while fetching data.
	const {isLoading, error, data} = useQuery({
		queryKey: ['posts'],
		queryFn: () =>
			axios
				.get(POST_URL, {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	const [numPosts, setNumPosts] = useState(1);

	// Increments the number of posts to be displayed by 2.
	const handleNumPostsIncrement = () => {
		setNumPosts(prevNumPosts => prevNumPosts + 2);
	};

	return (
		<Box class='w-full h-full mt-8 flex flex-col gap-[20px]'>
			{/* POSTS CONTAINER */}
			{error ? (
				<Typography class='text-red text-playfair text-lg'>
					Something went wrong!
				</Typography>
			) : isLoading ? (
				<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
			) : (
				data.slice(0, numPosts).map(post => <Post post={post} key={post.id} />)
			)}

			{/* LOAD MORE BUTTON */}
			{data && numPosts < Object.keys(data).length && (
				<Button onClick={handleNumPostsIncrement} variant='contained' color='primary'>
					<Typography class='font-source font-3xl'>Load More</Typography>
				</Button>
			)}
		</Box>
	);
}

export default Posts;
