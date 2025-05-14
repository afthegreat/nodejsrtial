import { Box } from "@chakra-ui/react"
import HomePage from "./pages/homePage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/navBar"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
  
  <Box minH="100vh" >
    <Navbar />
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/create" element={<CreatePage />} />
  </Routes>
  </Box>
)
}

export default App
