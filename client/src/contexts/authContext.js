import {createContext, useState, useEffect} from 'react';

import axios from 'axios';

import {AUTH_LOGIN_URL} from '../urls';

export const AuthContext = createContext();

// A context provider that determines if a user is logged in or not.
export const AuthContextProvider = ({children}) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem('user') || null)
	);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser));
	}, [currentUser]);

	// Logs in a user.
	const login = async inputs => {
		const res = await axios.post(AUTH_LOGIN_URL, inputs, {
			withCredentials: true
		});

		setCurrentUser(res.data);
	};

	return <AuthContext.Provider value={{currentUser, login}}>{children}</AuthContext.Provider>;
};
