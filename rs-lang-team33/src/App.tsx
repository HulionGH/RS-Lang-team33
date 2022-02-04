import "./App.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import SideBar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  const [counter, setConter] = useState(0);

  return (
    <Box className="home-page" display="flex" sx={{ flexDirection: "column" }}>
      <Header />
      <Box display="flex" flexGrow={1}>
        <SideBar />
        <Box className="content"></Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
