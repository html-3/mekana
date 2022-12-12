/* @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			borderWidth: {
				6: '6px',
			},
			minWidth: {
				120: '120px',
			},
			colors: {
				'electric-orange': '#FB923C',
				'yellow-punk': '#FACC15',
				'stone-black': '#1C1917',
				'what-white': '#F5F5F4',
				'base-gray': '#A8A29E',
				'moody-gray': '#414141',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
