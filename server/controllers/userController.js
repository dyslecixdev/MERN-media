import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import connectDB from '../configs/db.js';

dotenv.config();

// Gets the logged in user.
export const getUser = (req, res) => {
	const {userId} = req.params;
	const q = 'SELECT * FROM users WHERE id = ?';

	return connectDB.query(q, [userId], (err, data) => {
		if (err) return res.status(500).json(err);

		const {password, ...otherData} = data[0];
		return res.json(otherData);
	});
};

// Gets all the users except the logged in user.
export const getAllUsers = (req, res) => {
	const {userId} = req.params;
	const q = 'SELECT id, username, profilePic FROM users WHERE id <> ? ORDER BY username ASC';

	return connectDB.query(q, [userId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.json(data);
	});
};

// Updates the logged in user.
export const updateUser = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	const {username, desc, email, password, confirmPassword, profilePic} = req.body;
	if (!username || !desc || !email || !password) return res.status(400).json('Fill all fields!');
	// Note because we are using form data, the data type of every variable is an object.
	const passwordString = JSON.stringify(password);
	if (passwordString !== JSON.stringify(confirmPassword))
		return res.status(400).json('Passwords do not match!');

	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		const salt = bcrypt.genSaltSync(10);
		// The stringified password contains [""], so we slice to remove the first and last two elements.
		const passwordStringSlice = passwordString.slice(2, password.length - 3);
		const hashedPassword = bcrypt.hashSync(passwordStringSlice, salt);

		const q =
			'UPDATE users SET `username` = ?, `desc` = ?, `email` = ?, `password` = ?, `profilePic` = ? WHERE id = ?';
		const values = [username, desc, email, hashedPassword, profilePic, userInfo.id];

		return connectDB.query(q, values, (err, data) => {
			if (err) return res.status(500).json(err);

			// If at least one row for the user was changed, send this message.
			if (data.affectedRows > 0) return res.json('Updated user!');

			// If no rows were for the user was changed, send this message.
			return res.status(403).json('Only the logged in user can update themself!');
		});
	});
};
