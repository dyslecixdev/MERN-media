// POSTS

import {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Post from './Post';

import {posts} from '../data';

function Posts() {
	const [numPosts, setNumPosts] = useState(1);

	// Increments the number of posts to be displayed by 2.
	const handleNumPostsIncrement = () => {
		setNumPosts(prevNumPosts => prevNumPosts + 2);
	};

	return (
		<Box class='w-full h-full mt-8 flex flex-col gap-[20px]'>
			{/* POSTS CONTAINER */}
			{posts.slice(0, numPosts).map(post => (
				<Post post={post} />
			))}

			{/* LOAD MORE BUTTON */}
			{numPosts !== posts.length && (
				<Button onClick={handleNumPostsIncrement} variant='contained' color='primary'>
					<Typography class='font-source font-3xl'>Load More</Typography>
				</Button>
			)}
		</Box>
	);
}

export default Posts;
