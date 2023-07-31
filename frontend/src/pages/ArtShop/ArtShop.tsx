import React from 'react';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";
import Layout from "../components/layout/Layout";
import ImageGallery from "./ImageGallery";

function ArtShop() {
    return (
        <div>
            <Layout>
                <ImageGallery/>
            </Layout>
        </div>
    );
}

export default ArtShop;