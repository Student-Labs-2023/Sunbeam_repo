import React, { ReactNode } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            {children}
            <ScrollToTopButton/>
            <Footer />
        </div>
    );
};

export default Layout;