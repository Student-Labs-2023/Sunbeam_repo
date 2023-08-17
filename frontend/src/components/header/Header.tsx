import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import '@fontsource/roboto/400.css';

function Header() {

    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        if (path === '/') {
            navigate(path);
        } else {
            window.open(path, '_blank');
        }
    };

    return (
        <nav className={styles.header}>
            <img src="/png/logo_header.png" alt="Логотип" onClick={() => navigateTo('/')} className={styles.logo}/>
            <div className={styles.layer}>
                <li><Link to="/schedule">Расписание</Link></li>
                <li><Link to="/news">Новости</Link></li>
                <li><Link to="/works">Наши работы</Link></li>
                <li><Link to="/art-shop">Арт-лавка</Link></li>
                <li><Link to="/about_us">О нас</Link></li>
            </div>
            <div className={styles.layer2}>
                <li><a href="tel:+79136400359">+7 (913) 640-03-59</a></li>
                <li><img src="/png/2гис.png" alt="2гис" onClick={() => navigateTo('https://2gis.ru/omsk/firm/70000001067193459?m=73.276957%2C55.046163%2F16')}/></li>
                <li><img src="/png/вк.png" alt="вк" onClick={() => navigateTo('https://vk.com/club217238950')}/></li>
            </div>
        </nav>
    );
}

export default Header;