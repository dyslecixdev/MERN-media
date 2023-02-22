import {Routes, Route} from 'react-router-dom';

import {ThemeProvider, CssBaseline, Box} from '@mui/material';

import Login from './pages/Login';
import Register from './pages/Register';

import {ColorModeContext, useMode} from './theme';

function App() {
	const [theme, colorMode] = useMode();

	return (
		// Our created context with the mode, and both memoized functions.
		<ColorModeContext.Provider value={colorMode}>
			{/* MUI's context for its theme */}
			<ThemeProvider theme={theme}>
				{/* MUI CSS Reset */}
				<CssBaseline />
				<Box>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</Box>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
