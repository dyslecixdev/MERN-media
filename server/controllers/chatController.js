import jwt from 'jsonwebtoken';

import connectDB from '../configs/db.js';

// Creates a chat message between two users.
export const createChat = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		const q = 'INSERT INTO chats (`message`, `senderUserId`, `receiverUserId`) VALUES (?)';
		const values = [req.body.message, userInfo.id, req.query.userId];

		return connectDB.query(q, [values], err => {
			if (err) return res.status(500).json(err);
			return res.status(200).json('Chat has been created!');
		});
	});
};

// Gets all the chat messages between two users.
export const getChats = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('User not logged in!');

	return jwt.verify(token, process.env.JWT_SECRET, (jwtErr, userInfo) => {
		if (jwtErr) return res.status(403).json('Token is invalid!');

		// Queries all chat messages where the two users can either be senders or receivers.
		const q =
			'SELECT id, message FROM chats WHERE senderUserId = ? AND receiverUserId = ? OR receiverUserId = ? AND senderUserId = ? ORDER BY id ASC';

		return connectDB.query(
			q,
			[userInfo.id, req.query.userId, userInfo.id, req.query.userId],
			(err, data) => {
				if (err) return res.status(500).json(err);
				return res.status(200).json(data);
			}
		);
	});
};
