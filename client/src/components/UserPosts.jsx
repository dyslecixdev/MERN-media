// USER POSTS

import Box from '@mui/material/Box';

import Post from './Post';

import {posts} from '../data';

function UserPosts() {
	return (
		<Box class='p-8'>
			{/* POSTS GRID CONTAINER */}
			<Box class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8'>
				{posts.map(post => (
					<Post post={post} grid={true} key={post.id} />
				))}
			</Box>
		</Box>
	);
}

export default UserPosts;
