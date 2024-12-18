/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
        "./node_modules/flowbite/**/*.js",
      ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        scaleUp: 'scaleUp 0.4s ease-out forwards',
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
