import React from 'react';
import Header from "./header/Header";
import Main from "./main/Main";
import OurProgram from "./ourprogram/OurProgram"
import Footer from "./footer/Footer";

function MainPage() {
    return (
        <div>
            <Header/>
            <Main/>
            <OurProgram/>
            <Footer/>
        </div>
    );
}

export default MainPage;