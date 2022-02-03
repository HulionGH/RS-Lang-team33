import "./App.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import SideBar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  const [counter, setConter] = useState(0);

  return (
    <Box className="home-page" sx={{ flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Header />
      </Box>

      <SideBar />

      <Footer />
    </Box>
  );
}

export default App;
