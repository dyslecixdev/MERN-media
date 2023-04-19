import mysql from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config();

// Connects to MySQL database.
const connectDB = mysql.createConnection({
	host: 'localhost',
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: 'mern_media'
});

// Checks if there is an error during connection to MYSQL database.
connectDB.connect(err => {
	if (err) {
		console.log(err);
		// Ends the process with some failure in Node.js.
		process.exit(1);
	} else console.log('MySQL Connected'.black.bgGreen.italic);
});

export default connectDB;
