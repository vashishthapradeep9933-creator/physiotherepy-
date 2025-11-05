/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#10b981", 600:"#059669", 700:"#047857" },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2,132,199,.15)",
      },
      backgroundImage: {
        'mesh': "radial-gradient(800px 400px at 80% -10%, rgba(16,185,129,.15), transparent), radial-gradient(600px 300px at -10% 20%, rgba(59,130,246,.12), transparent), linear-gradient(to bottom, #f0fdfa 0%, #ffffff 40%)",
        'noise': "url('/bg-pattern.svg')",
      }
    },
  },
  plugins: [],
}
