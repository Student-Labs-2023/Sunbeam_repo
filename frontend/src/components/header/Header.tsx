import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import {
    CONTACT_PHONE,
    GIS_LINK,
    VK_LINK
} from '../../config/constants';

function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [linkClicked, setLinkClicked] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    function closeMenu() {
        setMenuOpen(false);
    }

    const navigate = useNavigate();

    const navigateTo = (path: string, event: React.MouseEvent<HTMLAnchorElement | HTMLImageElement, MouseEvent>) => {
        event.stopPropagation();
        closeMenu();
        if (path === '/') {
            navigate(path);
        } else if (path === VK_LINK || path === GIS_LINK) {
            window.open(path, '_blank');
        } else {
            navigate(path);
        }
    };

    const handlePageClick = () => {
        if (linkClicked) {
            setLinkClicked(false);
        }
    };

    const isMobile = windowWidth <= 450;

    return (
        <header className={styles.header} onClick={handlePageClick}>
            <img
                src="/png/logo_header.png"
                alt="Логотип"
                onClick={(e) => navigateTo('/', e)}
                className={styles.logo}
            />
            <div className={`${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu}>
                <div className={styles.burgerIcon}>
                    <div className={styles.burgerBar}></div>
                    <div className={styles.burgerBar}></div>
                    <div className={styles.burgerBar}></div>
                </div>
            </div>
            {(isMenuOpen || !isMobile) && (
                <>
                    <div className={styles.overlay} onClick={closeMenu}></div>
                    <nav className={`${styles.layer} ${isMenuOpen ? styles.open : ''}`}>
                        <button className={`${styles.closeButton} ${isMenuOpen ? styles.showCloseButton : ''}`} onClick={toggleMenu}>
                            <div className={styles.closeCircle}>
                                <div className={styles.closeIcon}></div>
                                <div className={styles.closeIcon}></div>
                            </div>
                        </button>
                        <div className={styles.menuContent}>
                            <ul>
                                <li><Link to="/schedule" onClick={(e) => navigateTo('/schedule', e)}>Расписание</Link></li>
                                <li><Link to="/news" onClick={(e) => navigateTo('/news', e)}>Новости</Link></li>
                                <li><Link to="/works" onClick={(e) => navigateTo('/works', e)}>Наши работы</Link></li>
                                <li><Link to="/art-shop" onClick={(e) => navigateTo('/art-shop', e)}>Арт-лавка</Link></li>
                                <li><Link to="/about_us" onClick={(e) => navigateTo('/about_us', e)}>О нас</Link></li>
                            </ul>
                        </div>
                    </nav>
                </>
            )}
            <nav className={styles.layer2}>
                <li><a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a></li>
                <li>
                    <img
                        src="/png/2gis.png"
                        alt="2gis"
                        onClick={(e) => navigateTo(GIS_LINK, e)}
                    />
                </li>
                <li>
                    <img
                        src="/png/vk.png"
                        alt="vk"
                        onClick={(e) => navigateTo(VK_LINK, e)}
                    />
                </li>
            </nav>
        </header>
    );
}

export default Header;
