/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			// Add custom theme settings if needed
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("daisyui")],
};
