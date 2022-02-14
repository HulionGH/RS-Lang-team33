import { Routes, Route } from "react-router-dom";

import Box from "@mui/material/Box";

import SideBar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import AboutUs from "./feature/our-team/about-us";
import GamesGallery from "./feature/games-gallery/games-gallery";
import Book from "./feature/book/book";
import Dictionary from "./feature/dictionary/dictionary";
import Stats from "./feature/stats/stats";
import Home from "./feature/home-page/home-page";
import Login from "./feature/login/login-page";
import SignUp from "./feature/sign-up/sign-up-page";
import GameSprint from "./feature/games-gallery/sprint/sprint";
import GameAudioCall from "./feature/games-gallery/audio-call/audio-call";
import "./App.css";


function App() {
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
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sprint" element={<GameSprint />} />
            <Route path="/audion-call" element={<GameAudioCall />} />
            <Route path="/" element={<GameAudioCall />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
