import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

import authRoute from './routes/authRoute.js';
import commentRoute from './routes/commentRoute.js';
import likeRoute from './routes/likeRoute.js';
import postRoute from './routes/postRoute.js';
import relationshipRoute from './routes/relationshipRoute.js';
import userRoute from './routes/userRoute.js';

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

app.post('/api/upload', upload.single('picture'), (req, res) => {
	const {file} = req;
	res.status(200).json(file.filename);
});

app.use('/api/auth', authRoute);
app.use('/api/comments', commentRoute);
app.use('/api/likes', likeRoute);
app.use('/api/posts', postRoute);
app.use('/api/relationships', relationshipRoute);
app.use('/api/users', userRoute);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on port ${port}`.black.bgCyan.italic));
