import React from "react";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";
import Home from "./components/Home";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { ParallaxProvider } from "react-scroll-parallax";

function App() {
  return (
    <ParallaxProvider> {/* ✅ Wrap the entire app here */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        
         
        </Routes>
        <Footer />
      </Router>
    </ParallaxProvider>
  );
}

export default App;