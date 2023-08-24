import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import { Outlet, useLocation } from "react-router-dom";
import styles from './layout.module.css';

const Layout = () => {

    const location = useLocation();
    const isHomePage: boolean = location.pathname === '/';

    return (
        <>
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
            <ScrollToTopButton />
            <Footer isAbsolute={isHomePage} />
        </>
    );
}

export default Layout;