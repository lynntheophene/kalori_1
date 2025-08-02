/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0a',
          secondary: '#111111',
          tertiary: '#1a1a1a',
        },
        foreground: {
          DEFAULT: '#ffffff',
          secondary: '#f0f0f0',
          muted: '#a1a1aa',
        },
        // Gen Z Color Palette
        'neon-pink': '#ff0080',
        'neon-blue': '#00d4ff',
        'neon-green': '#00ff88',
        'neon-purple': '#8b5cf6',
        'neon-yellow': '#fbbf24',
        'neon-orange': '#ff6b35',
        primary: {
          DEFAULT: '#ff0080', // Hot pink
          hover: '#e60073',
          light: '#ff4da6',
        },
        accent: {
          DEFAULT: '#00ff88', // Lime green
          hover: '#00e676',
          light: '#4dffb8',
        },
        secondary: {
          DEFAULT: '#00d4ff', // Electric blue
          hover: '#00b8e6',
          light: '#4ddbff',
        },
        tertiary: {
          DEFAULT: '#8b5cf6', // Purple
          hover: '#7c3aed',
          light: '#a78bfa',
        },
        border: '#2a2a2a',
        destructive: {
          DEFAULT: '#ff4757',
          hover: '#ff3742',
        },
        gray: {
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 0, 128, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 0, 128, 0.8)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-genz': 'linear-gradient(135deg, #ff0080 0%, #00d4ff 25%, #00ff88 50%, #8b5cf6 75%, #ff0080 100%)',
        'gradient-neon': 'linear-gradient(45deg, #ff0080, #00d4ff, #00ff88, #8b5cf6)',
        'gradient-pink-blue': 'linear-gradient(135deg, #ff0080 0%, #00d4ff 100%)',
        'gradient-green-purple': 'linear-gradient(135deg, #00ff88 0%, #8b5cf6 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}