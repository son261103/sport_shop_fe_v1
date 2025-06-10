/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      // 🎨 Sport Shop Color Palette
      colors: {
        // Light Mode Colors
        light: {
          bg: {
            primary: "#F8F9FA", // Nền chính - Trắng ngà
            secondary: "#E9ECEF", // Nền phụ/card - Xám nhạt
          },
          text: {
            primary: "#212529", // Chữ chính - Xám đậm/đen
            secondary: "#6C757D", // Chữ phụ
            muted: "#ADB5BD", // Chữ mờ
          },
          accent: {
            sport: "#00C897", // Xanh neon thể thao
            "sport-hover": "#1AFFA3", // Xanh hover
            danger: "#EF233C", // Đỏ thể thao
            warning: "#FFC107", // Vàng cảnh báo
            info: "#17A2B8", // Xanh thông tin
          },
          border: {
            primary: "#CED4DA", // Viền, hover - Xám vừa
            secondary: "#DEE2E6", // Viền nhạt
          },
        },
        // Dark Mode Colors
        dark: {
          bg: {
            primary: "#121212", // Nền chính - Gần đen
            secondary: "#1E1E1E", // Nền phụ/card - Xám đậm
            tertiary: "#0A0F0D", // Nền xanh đen
          },
          text: {
            primary: "#F8F9FA", // Chữ chính - Trắng
            secondary: "#E9ECEF", // Chữ phụ
            muted: "#6C757D", // Chữ mờ
          },
          accent: {
            sport: "#00E5A1", // Xanh neon
            "sport-hover": "#4DFFBA", // Xanh hover dark
            danger: "#FF4757", // Đỏ neon
            warning: "#FFA726", // Vàng neon
            info: "#26C6DA", // Xanh neon thông tin
          },
          border: {
            primary: "#2C2C2C", // Viền, hover - Xám nhạt
            secondary: "#404040", // Viền đậm hơn
          },
        },
        // Semantic Colors (work in both modes)
        primary: {
          50: "#E8FFF8",
          100: "#C7FFE8",
          200: "#8FFFD1",
          300: "#4DFFBA",
          400: "#1AFFA3",
          500: "#00C897", // Main sport green
          600: "#00A67D",
          700: "#008563",
          800: "#006349",
          900: "#004230",
        },
        danger: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF233C", // Main sport red
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
      },

      // 🌈 Gradient Configurations
      backgroundImage: {
        // Primary Sport Gradients (Light Mode)
        "gradient-sport": "linear-gradient(135deg, #00C897 0%, #00A67D 100%)",
        "gradient-sport-hover":
          "linear-gradient(135deg, #1AFFA3 0%, #00C897 100%)",
        "gradient-sport-soft":
          "linear-gradient(135deg, #C7FFE8 0%, #8FFFD1 100%)",

        // Primary Sport Gradients (Dark Mode)
        "gradient-sport-dark":
          "linear-gradient(135deg, #00E5A1 0%, #00C897 100%)",
        "gradient-sport-dark-hover":
          "linear-gradient(135deg, #4DFFBA 0%, #00E5A1 100%)",
        "gradient-sport-dark-soft":
          "linear-gradient(135deg, #004230 0%, #006349 100%)",

        // Animated Gradients
        "gradient-sport-animated":
          "linear-gradient(45deg, #00C897, #1AFFA3, #00E5A1, #00C897)",
        "gradient-sport-animated-dark":
          "linear-gradient(45deg, #00E5A1, #4DFFBA, #1AFFA3, #00E5A1)",

        // Text Gradients
        "gradient-text-sport":
          "linear-gradient(90deg, #00C897 0%, #1AFFA3 50%, #00A67D 100%)",
        "gradient-text-sport-dark":
          "linear-gradient(90deg, #00E5A1 0%, #4DFFBA 50%, #00C897 100%)",

        // Subtle Background Gradients
        "gradient-bg-sport":
          "linear-gradient(135deg, #F8F9FA 0%, #E8FFF8 100%)",
        "gradient-bg-sport-dark":
          "linear-gradient(135deg, #121212 0%, #0A0F0D 100%)",

        // Danger Gradients
        "gradient-danger": "linear-gradient(135deg, #EF233C 0%, #DC2626 100%)",
        "gradient-danger-dark":
          "linear-gradient(135deg, #FF4757 0%, #EF233C 100%)",
      },

      // 🎨 Animation for Gradient Movement
      animation: {
        "gradient-x": "gradient-x 3s ease infinite",
        "gradient-y": "gradient-y 3s ease infinite",
        "gradient-xy": "gradient-xy 3s ease infinite",
      },

      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },

      // 📏 Typography Scale
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },

      // 📐 Spacing Scale (Enhanced)
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },

      // 🔄 Border Radius
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },

      // 🌟 Box Shadows
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        sport: "0 4px 14px 0 rgb(0 200 151 / 0.15)",
        "sport-lg": "0 8px 25px 0 rgb(0 200 151 / 0.2)",
        danger: "0 4px 14px 0 rgb(239 35 60 / 0.15)",
        none: "none",
      },
    },
  },
  plugins: [],
};
