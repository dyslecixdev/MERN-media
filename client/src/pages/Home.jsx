// HOME PAGE

import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import Leftbar from '../components/Leftbar';
import Middlebar from '../components/Middlebar';
import Rightbar from '../components/Rightbar';

function Home() {
	const theme = useTheme();
	const {mode} = theme.palette;

	return (
		<Box
			class={`min-h-[90vh] w-full flex md:gap-[50px] font-source md:pl-12 ${
				mode === 'dark' ? '' : 'bg-off-white'
			}`}
		>
			<Leftbar />
			<Middlebar />
			<Rightbar />
		</Box>
	);
}

export default Home;
