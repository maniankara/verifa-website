
const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			// sans: ['ITC Avant Garde Pro Md', 'sans-serif'],
			// title: ['Helvetica', 'sans-serif'],
			sans: ['Outfit', 'sans-serif'],
		},
		extend: {
			colors: {
				'v-black': "#0d0e12",
				'v-pink': "#fc9cac",
				'v-green': "#ccecef",
				'v-gray': "#c4d0dd",
				'v-lilac': "#ad9ce3",
				'v-beige': "#8f8379",
				'v-white': "#f9fafb",
			},
			lineHeight: {
				'pizzo': '1.1',
			}
		}
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	]
};

module.exports = config;
