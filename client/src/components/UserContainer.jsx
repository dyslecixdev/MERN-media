// USER CONTAINER

import {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';

import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

import {AuthContext} from '../contexts/authContext';

import EditUserModal from './EditUserModal';

import axios from 'axios';

import {QUERY_USER_URL, QUERY_RELATIONSHIP_URL, RELATIONSHIP_URL} from '../urls';

function UserContainer() {
	const {currentUser} = useContext(AuthContext);

	const theme = useTheme();
	const {mode} = theme.palette;

	const {id} = useParams();

	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);

	// Fetching this user.
	// Since I have two of these fetching functions, I renamed the isLoading, error, and data to avoid confusion.
	const {
		isLoading: userIsLoading,
		error: userError,
		data: userData
	} = useQuery({
		queryKey: ['user', id],
		queryFn: () =>
			axios
				.get(QUERY_USER_URL(id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Fetching logged in user's relationships.
	const {
		isLoading: relationshipIsLoading,
		error: relationshipError,
		data: relationshipData
	} = useQuery({
		queryKey: ['relationship', id],
		queryFn: () =>
			axios
				.get(QUERY_RELATIONSHIP_URL(id), {
					withCredentials: true
				})
				.then(res => {
					return res.data;
				})
	});

	// Gets all the relationships again after mutating existing data.
	const mutation = useMutation({
		mutationFn: following => {
			// Deletes the relationship if it already exists.
			if (following)
				return axios.delete(QUERY_RELATIONSHIP_URL(id), {
					withCredentials: true
				});
			// Creates a relationship if it does not exist.
			return axios.post(
				RELATIONSHIP_URL,
				{userId: id},
				{
					withCredentials: true
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['relationship']});
		}
	});

	// Opens the modal.
	const handleModalOpen = () => setOpen(true);

	// Closes the modal.
	const handleModalClose = () => setOpen(false);

	// Creates or deletes a relationship.
	const handleAddFriend = () => {
		mutation.mutate(relationshipData.includes(currentUser.id));
	};

	return (
		<Box class='flex flex-col sm:flex-row items-center py-2 md:px-20 lg:px-40 xl:px-80 gap-[20px] md:gap-[40px] font-source'>
			{/* USER AVATAR */}
			{userError ? (
				<Typography class='text-red text-playfair text-lg'>
					Something went wrong!
				</Typography>
			) : userIsLoading ? (
				<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
			) : (
				<Avatar
					alt={userData.username}
					src={userData.profilePic || userData.username[0]}
					sx={{width: 200, height: 200}}
				/>
			)}

			{/* CONTAINER RIGHT OF USER AVATAR */}
			{userError ? (
				<Typography class='text-red text-playfair text-lg'>
					Something went wrong!
				</Typography>
			) : userIsLoading ? (
				<Typography class='text-green text-playfair text-lg'>Loading...</Typography>
			) : (
				<Box class='flex flex-col gap-[20px]'>
					{/* TOP PART OF CONTAINER */}
					<Box class='flex gap-[20px] items-center'>
						{/* USERNAME */}
						<Typography class='font-playfair text-3xl'>{userData.username}</Typography>

						{Number(id) === currentUser.id ? (
							// EDIT PROFILE BUTTON
							<Button
								onClick={handleModalOpen}
								variant={mode === 'dark' ? 'outlined' : 'contained'}
								color='secondary'
								startIcon={<SettingsOutlinedIcon />}
							>
								Edit Profile
							</Button>
						) : relationshipError ? (
							<Typography class='text-red text-playfair text-lg'>
								Something went wrong!
							</Typography>
						) : relationshipIsLoading ? (
							<Typography class='text-green text-playfair text-lg'>
								Loading...
							</Typography>
						) : (
							// FOLLOWING OR ADD FRIEND BUTTON
							<Button
								onClick={handleAddFriend}
								variant={mode === 'dark' ? 'outlined' : 'contained'}
								color='secondary'
								startIcon={<PersonAddOutlinedIcon />}
							>
								{relationshipData.includes(currentUser.id)
									? 'Following Friend'
									: 'Add Friend'}
							</Button>
						)}
					</Box>

					{/* BOTTOM PART OF CONTAINER */}
					<Box class='flex gap-[40px] items-center'>
						{/* USER POSTS */}
						<Box class='flex gap-[7px] text-xl items-baseline'>
							{/* todo */}
							<Typography class='font-black'>
								{currentUser.posts || 0}
							</Typography>{' '}
							<Typography>posts</Typography>
						</Box>

						{/* USER LIKES */}
						<Box class='flex gap-[7px] text-xl items-baseline'>
							{/* todo */}
							<Typography class='font-black'>
								{currentUser.likes || 0}
							</Typography>{' '}
							<Typography>likes</Typography>
						</Box>

						{/* USER COMMENTS */}
						<Box class='flex gap-[7px] text-xl items-baseline'>
							{/* todo */}
							<Typography class='font-black'>
								{currentUser.comments || 0}
							</Typography>{' '}
							<Typography>comments</Typography>
						</Box>
					</Box>

					{/* USER DESCRIPTION */}
					<Typography>{userData.desc}</Typography>
				</Box>
			)}

			{/* EDIT USER MODAL */}
			<EditUserModal handleModalClose={handleModalClose} open={open} />
		</Box>
	);
}

export default UserContainer;
