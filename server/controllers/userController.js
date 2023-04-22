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
