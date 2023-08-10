import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import './App.css';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import SchedulePage from './pages/SchedulePage/SсhedulePage';
import NewsPage from './pages/NewsPage';
import OurWorks from './pages/OurWorks';
import ArtShop from './pages/ArtShop/ArtShop';
import AboutUs from "./pages/AboutUs";

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
    cache: new InMemoryCache()
})

function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
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
            </ApolloProvider>
        </Router>
    );
}

export default App;
