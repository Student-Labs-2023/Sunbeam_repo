import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Main from "./main/Main";
import Tables from './tables/Tables';
import AboutStudio from './about_studio/AboutStudio'
import OurProgram from './our_program/OurProgram'
import Footer from '../../components/footer/Footer';
import WhyDrawingIsGood from "./why_drawing_is_good/WhyDrawingIsGood";
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import Layout from "../../components/layout/Layout";

function MainPage() {
    return (
        <div>
            <Main/>
            <AboutStudio/>
            <Tables/>
            <OurProgram/>
            <WhyDrawingIsGood/>
        </div>
    );
}

export default MainPage;