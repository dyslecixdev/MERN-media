import {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {ThemeProvider, CssBaseline, Box} from '@mui/material';

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ChatRoom from './pages/ChatRoom';

import {AuthContext} from './contexts/authContext';
import {ColorModeContext, useMode} from './theme';

function App() {
	const {currentUser} = useContext(AuthContext);

	const [theme, colorMode] = useMode();

	const queryClient = new QueryClient();

	return (
		// React Query to simplify data fetching.
		<QueryClientProvider client={queryClient}>
			{/* Our created context with the mode, and both memoized functions */}
			<ColorModeContext.Provider value={colorMode}>
				{/* MUI's context for its theme */}
				<ThemeProvider theme={theme}>
					{/* MUI CSS Reset */}
					<CssBaseline />
					<Box>
						<Routes>
							<Route
								path='/login'
								element={currentUser ? <Navigate to='/' /> : <Login />}
							/>
							<Route
								path='/register'
								element={currentUser ? <Navigate to='/' /> : <Register />}
							/>
							<Route
								path='/'
								element={currentUser ? <Navbar /> : <Navigate to='/login' />}
							>
								<Route index element={<Home />} />
								<Route path='/profile/:id' element={<Profile />} />
								<Route path='/chatroom' element={<ChatRoom />} />
							</Route>
						</Routes>
					</Box>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</QueryClientProvider>
	);
}

export default App;
