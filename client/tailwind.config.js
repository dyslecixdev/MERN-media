/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'], // Configured to all html, js, and jsx files in the src folder.
	mode: 'jit', // Enables just-in-time for performance.
	theme: {
		extend: {
			// Color palette.
			colors: {
				red: '#c41717',
				orange: '#dfb175',
				'light-blue': '#0de7f8',
				blue: '#2da4f8',
				'transparent-blue': 'rgba(45, 164, 248, 0.1)',
				'slate-blue': '#153a59',
				'light-black': '#141b2d',
				black: '#0c101b',
				'transparent-black': 'rgba(19, 25, 28, 0.8)',
				gray: '#e0e0e0',
				white: '#ffffff',
				'off-white': '#F9F6ED'
			},
			// Background images.
			backgroundImage: {
				'login-crowd': "url('./assets/login-crowd.jpg')",
				'register-crowd': "url('./assets/register-crowd.jpg')",
				// Adds radial gradient.
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
			},
			// Fonts.
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				source: ['Source Sans Pro', 'sans-serif']
			},
			// Flex sizes.
			flex: {
				2: '2 2 0%',
				3: '3 3 0%',
				4: '4 4 0%',
				5: '5 5 0%',
				6: '6 6 0%',
				7: '7 7 0%',
				8: '8 8 0%',
				9: '9 9 0%'
			}
		}
	},
	// tailwind-scrollbar.
	plugins: [require('tailwind-scrollbar')]
};
