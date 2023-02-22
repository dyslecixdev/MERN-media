import {Routes, Route, Navigate} from 'react-router-dom';

import {ThemeProvider, CssBaseline, Box} from '@mui/material';

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';

import {ColorModeContext, useMode} from './theme';

function App() {
	// Simulates a logged in user.
	const user = true;

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
						<Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
						<Route
							path='/register'
							element={user ? <Navigate to='/' /> : <Register />}
						/>
						<Route path='/' element={user ? <Navbar /> : <Navigate to='/login' />}>
							<Route index element={<Home />} />
							<Route path='/profile/:id' element={<Profile />} />
						</Route>
					</Routes>
				</Box>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
