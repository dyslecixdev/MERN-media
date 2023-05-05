import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import {createServer} from 'http';
import {Server} from 'socket.io';
import * as dotenv from 'dotenv';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

import authRoute from './routes/authRoute.js';
import chatRoute from './routes/chatRoute.js';
import commentRoute from './routes/commentRoute.js';
import likeRoute from './routes/likeRoute.js';
import postRoute from './routes/postRoute.js';
import relationshipRoute from './routes/relationshipRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// Middleware.
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000'
	})
);
app.use(cookieParser());

// Multer.
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, '../client/public/upload');
	},
	filename(req, file, cb) {
		cb(null, Date.now() + file.originalname);
	}
});

const upload = multer({storage});

app.post('/api/upload', upload.single('file'), (req, res) => {
	const {file} = req;
	res.status(200).json(file.filename);
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/chats', chatRoute);
app.use('/api/comments', commentRoute);
app.use('/api/likes', likeRoute);
app.use('/api/posts', postRoute);
app.use('/api/relationships', relationshipRoute);
app.use('/api/users', userRoute);

// Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000'
	}
});

io.on('connection', socket => {
	// Logs that the user is connected.
	console.log(`User connected`.white.bgBlue);

	// Logs that the user joined the room.
	socket.on('join-room-from-client', ({room}) => {
		socket.join(room);
		console.log(`User joined room: ${room}`.white.bgYellow);
	});

	// Logs that the user left the room.
	socket.on('leave-room-from-client', ({room}) => {
		socket.leave({room});
		if (!room) console.log('User left the Welcome page'.white.bgMagenta);
		else console.log(`User left room: ${room}`.white.bgMagenta);
	});

	// Logs that the user is disconnected.
	socket.on('disconnect', () => {
		console.log(`User disconnected`.white.bgRed);
	});
});

httpServer.listen(port, () => console.log(`Server started on port ${port}`.black.bgCyan.italic));
