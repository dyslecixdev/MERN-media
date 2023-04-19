import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import connectDB from '../configs/db.js';

dotenv.config();

// Registers a user.
export const registerUser = (req, res) => {
	const {name, username, email, password, confirmPassword, profilePic} = req.body;
	if (!name || !username || !email || !password) return res.status(400).json('Fill all fields!');
	if (password !== confirmPassword) return res.status(400).json('Passwords do not match!');

	// Using ? provides extra security in queries.
	const selectQ = 'SELECT * FROM users WHERE username = ? OR email = ?';

	return connectDB.query(selectQ, [username, email], (selectErr, data) => {
		if (selectErr) return res.status(500).json(selectErr);
		if (data.length) return res.status(409).json('User already exists!');

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const insertQ =
			'INSERT INTO users (`name`, `username`,`email`,`password`, `profilePic`) VALUE (?)';
		// Array of values must be in the order listed above.
		const values = [name, username, email, hashedPassword, profilePic];

		// Placing the values directly creates a "Column count doesn't match value count at row 1" error.
		return connectDB.query(insertQ, [values], insertErr => {
			if (insertErr) return res.status(500).json(insertErr);
			return res.status(200).json('User has been created!');
		});
	});
};

// Logs in a user.
export const loginUser = (req, res) => {
	const q = 'SELECT * FROM users WHERE email = ?';

	connectDB.query(q, [req.body.email], (err, data) => {
		if (err) return res.status(500).json(err);
		if (data.length === 0) return res.status(404).json('User not found or wrong password!');

		const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
		if (!checkPassword) return res.status(400).json('User not found or wrong password!');

		// Creates a JSON web token.
		const token = jwt.sign({id: data[0].id}, process.env.JWT_SECRET);
		const {password, ...otherData} = data[0];

		// Creates a cookie with an accessToken key and a token value.
		return res
			.cookie('accessToken', token, {
				httpOnly: true
			})
			.status(200)
			.json(otherData);
	});
};

// Logs out a user.
export const logoutUser = (req, res) => {
	// Clears the cookie.
	return res
		.clearCookie('accessToken', {
			secure: true,
			sameSite: 'none'
		})
		.status(200)
		.json('User has been logged out!');
};
