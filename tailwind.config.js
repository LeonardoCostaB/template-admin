/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   darkMode: 'class',
   theme: {
      extend: {
         fontFamily: {
            sans: 'var(--font-poppins)',
         },
         colors: {
            'black-transparent-500': '#0000004d',
         },
         left: {
            100: 'calc(-100% + -20px)',
         },
         backgroundSize: {
            'size-200': '200% 200%',
         },
         backgroundPosition: {
            'pos-0': '0% 0%',
            'pos-100': '100% 100%',
         },
      },
   },
   plugins: [],
};
