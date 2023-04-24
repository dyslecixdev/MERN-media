import jwt from 'jsonwebtoken';
import moment from 'moment';
import dotenv from 'dotenv';

import connectDB from '../configs/db.js';

dotenv.config();

// Creates a comment for one post.
export const createComment = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		const q = 'INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)';
		const values = [
			req.body.desc,
			moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
			userInfo.id,
			req.body.postId
		];

		return connectDB.query(q, [values], err => {
			if (err) return res.status(500).json(err);
			return res.status(200).json('Comment has been created!');
		});
	});
};

// Gets all the comments for one post.
export const getPostComments = (req, res) => {
	const q = `SELECT c.*, u.id AS userId, username, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`;

	connectDB.query(q, [req.query.postId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data);
	});
};

// Gets all the comments for one user.
export const getUserComments = (req, res) => {
	const q = `SELECT * FROM comments WHERE userId = ?`;

	connectDB.query(q, [req.query.userId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data);
	});
};
