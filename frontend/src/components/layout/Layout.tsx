import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import {Outlet} from "react-router-dom";
import styles from './layout.module.css';

const Layout = () => {
    return (
        <>
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
            <ScrollToTopButton/>
            <Footer />
        </>
    );
};

export default Layout;