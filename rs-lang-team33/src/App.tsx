import "./App.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import SideBar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Routes, Route, Link } from "react-router-dom";
import AboutUs from "./feature/our-team/about-us";
import GamesGallery from "./feature/games-gallery/games-gallery";
import Book from "./feature/book/book";
import Dictionary from "./feature/dictionary/dictionary";
import Stats from "./feature/stats/stats";
import Home from "./feature/home-page/home-page";

function App() {
  const [counter, setConter] = useState(0);

  return (
    <Box className="home-page" display="flex" sx={{ flexDirection: "column" }}>
      <Header />
      <Box display="flex" flexGrow={1}>
        <SideBar />
        <Box className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Book />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/games" element={<GamesGallery />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
