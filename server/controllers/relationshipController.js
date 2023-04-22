import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import connectDB from '../configs/db.js';

dotenv.config();

// Creates a relationship between two users.
export const createRelationship = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		const q = 'INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)';
		const values = [userInfo.id, req.body.userId];

		return connectDB.query(q, [values], err => {
			if (err) return res.status(500).json(err);
			return res.status(200).json('Logged in user is friends with another user!');
		});
	});
};

// Gets all the relationships for the logged in user.
export const getRelationships = (req, res) => {
	const q = 'SELECT followerUserId FROM relationships WHERE followedUserId = ?';

	connectDB.query(q, [req.query.userId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data.map(relationship => relationship.followerUserId));
	});
};

// Deletes a relationship between two users.
export const deleteRelationship = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		const q = 'DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?';

		return connectDB.query(q, [userInfo.id, req.query.userId], err => {
			if (err) return res.status(500).json(err);
			return res.status(200).json('Logged in user is no longer friends with another user!');
		});
	});
};
