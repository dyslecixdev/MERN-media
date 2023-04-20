import jwt from 'jsonwebtoken';
import moment from 'moment';
import dotenv from 'dotenv';

import connectDB from '../configs/db.js';

dotenv.config();

// Creates a post.
export const createPost = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	// Checks that the user is logged in by looking for its token.
	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		// Selects all of the user's and friends' posts, and the user's id, name, and profile picture that created each post.
		const q = 'INSERT INTO posts (`message`, `picture`, `userId`, `createdAt`) VALUES (?)';
		const values = [
			req.body.message,
			req.body.picture,
			userInfo.id,
			moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
		];

		return connectDB.query(q, [values], err => {
			if (err) return res.status(500).json(err);
			return res.status(200).json('Post has been created!');
		});
	});
};

// Gets all the posts.
export const getPosts = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		// Selects all of the user's and friends' posts, and the user's id, name, and profile picture that created each post.
		const q = `SELECT p.*, u.id As userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;

		return connectDB.query(q, [userInfo.id, userInfo.id], (err, data) => {
			if (err) return res.status(500).json(err);
			return res.status(200).json(data);
		});
	});
};
