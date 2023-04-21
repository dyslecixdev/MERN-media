import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import connectDB from '../configs/db.js';

dotenv.config();

// Creates a like for one post.
export const createLike = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		const q = 'INSERT INTO likes (`userId`, `postId`) VALUES (?)';
		const values = [userInfo.id, req.body.postId];

		return connectDB.query(q, [values], err => {
			if (err) return res.status(500).json(err);
			return res.status(200).json('Post has been liked!');
		});
	});
};

// Gets all the likes for one post.
export const getLikes = (req, res) => {
	const q = 'SELECT userId FROM likes WHERE postId = ?';

	connectDB.query(q, [req.query.postId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data.map(like => like.userId));
	});
};

// Deletes a like for one post.
export const deleteLike = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		const q = 'DELETE FROM likes WHERE `userId` = ? AND `postId` = ?';

		return connectDB.query(q, [userInfo.id, req.query.postId], err => {
			if (err) return res.status(500).json(err);
			return res.status(200).json('Post has like removed!');
		});
	});
};
