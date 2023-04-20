import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import connectDB from '../configs/db.js';

dotenv.config();

// Gets all the posts.
export const getPosts = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(403).json('Token is invalid!');

		// Selects all of the user's and friends' posts, and the user's id, name, and profile picture that created each post.
		const q = `SELECT p.*, u.id As userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;

		connectDB.query(q, [userInfo.id, userInfo.id], (err, data) => {
			if (err) return res.status(500).json(err);
			return res.status(200).json(data);
		});
	});
};
