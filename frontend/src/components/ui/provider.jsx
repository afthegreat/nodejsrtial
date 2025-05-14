// src/components/ui/provider.jsx
import { ChakraProvider } from "@chakra-ui/react";    
import theme from "./theme"; 
export function Provider(props) {
  return (
    <ChakraProvider theme={theme}>
      {props.children} {/* Render child components */}
    </ChakraProvider>
  );
}
