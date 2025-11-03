/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter-Regular', 'sans-serif'],
        "inter-bold": ['Inter-Bold', 'sans-serif'],
        "inter-extrabold": ['Inter-ExtraBold', 'sans-serif'],
        "inter-medium": ['Inter-Medium', 'sans-serif'],
        "inter-semibold": ['Inter-SemiBold', 'sans-serif'],
        "inter-light": ['Inter-Light', 'sans-serif'],
      },
      colors: {
        // Primary brand colors
        "primary": "#28D8FF",
        "secondary": "2C2C2C",

        // Backgrounds
        "background-light": "#F9FAFB",
        "background-dark": "#121212",
        "card-light": "#FFFFFF",
        "card-dark": "#2D3748",
        "muted-light": "#F3F4F6", // for Inputs 
        "muted-dark": "#374151",

        // Text
        "text-light": "#000000",
        "text-dark": "#F7F9FC",
        "text-muted-light": "#6B7280",
        "text-muted-dark": "#A0AEC0",
        "text-accent-light": "#2563EB",
        "text-accent-dark": "#60A5FA",

        // Borders
        "border-light": "#E5E7EB",
        "border-dark": "#4B5563",

        // Accents
        "accent-primary": "#3B82F6",
        "accent-secondary": "#10B981",
        "accent-warning": "#F59E0B",
        "accent-danger": "#EF4444",

        // Hover
        "hover-card-light": "#F3F4F6",
        "hover-card-dark": "#3B4252",
        "hover-accent-primary": "#2563EB",
        "hover-accent-secondary": "#059669",
        "hover-accent-danger": "#DC2626",
      },
    },
  },
  plugins: [],
}