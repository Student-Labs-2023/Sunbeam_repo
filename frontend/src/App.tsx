import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import './App.css';
import SchedulePage from "./pages/SсhedulePage";
import NewsPage from "./pages/NewsPage";
import ArtShop from "./pages/ArtShop/ArtShop";
import OurWorks from "./pages/OurWorks";
import AboutUs from "./pages/AboutUs";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage/>}/>
                    <Route path="/schedule" element={<SchedulePage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/works" element={<OurWorks />} />
                    <Route path="/art-shop" element={<ArtShop />} />
                    <Route path="/about_us" element={<AboutUs />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;