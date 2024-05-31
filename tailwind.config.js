/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      BannerImg: {
        'bannerImg': "url('/src/assets/mask_1.png')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}