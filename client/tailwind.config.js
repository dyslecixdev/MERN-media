/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'], // Configured to all html, js, and jsx files in the src folder.
	mode: 'jit', // Enables just-in-time for performance.
	theme: {
		extend: {
			// Color palette.
			colors: {
				blue: '#0de7f8',
				'transparent-black': 'rgba(19, 25, 28, 0.8)',
				white: '#ffffff'
			},
			// Background images.
			backgroundImage: {
				'login-crowd': "url('./assets/login-crowd.jpg')"
			},
			// Fonts.
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				source: ['Source Sans Pro', 'sans-serif']
			}
		}
	},
	plugins: []
};
