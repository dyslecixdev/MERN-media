import {useContext} from 'react';

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import Leftbar from '../components/Leftbar';
import Middlebar from '../components/Middlebar';
import Rightbar from '../components/Rightbar';

import {tokens} from '../theme';
import {ColorModeContext} from '../theme';

// Fake user data.
const user = {
	id: 1,
	username: 'Christian',
	email: 'cd@gmail.com',
	profilePic: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
	desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt architecto pariatur praesentium maiores hic! Atque quod repudiandae officia delectus voluptas eos maxime a assumenda maiores sequi molestias itaque, veniam molestiae!'
};

function Home() {
	const theme = useTheme();
	const {mode} = theme.palette;
	const colors = tokens(mode);
	const colorMode = useContext(ColorModeContext);

	return (
		<Box
			class={`min-h-[90vh] w-full flex md:gap-[50px] font-source md:pl-12 ${
				mode === 'dark' ? '' : 'bg-off-white'
			}`}
		>
			<Leftbar user={user} />
			<Middlebar user={user} />
			<Rightbar />
		</Box>
	);
}

export default Home;
