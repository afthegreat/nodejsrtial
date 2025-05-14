// src/components/ui/theme.js
import { extendTheme } from "@chakra-ui/react";

// Example theme configuration
const theme = extendTheme({
  config: {
    initialColorMode: "light", // Set the default color mode here
    useSystemColorMode: false,
  },
  // You can add custom colors, breakpoints, etc. here
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

export default theme;
