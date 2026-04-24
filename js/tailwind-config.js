tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          900: "#172554"
        },
        civic: {
          gold: "#f5b942",
          green: "#16a34a"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.10)"
      }
    }
  }
};
