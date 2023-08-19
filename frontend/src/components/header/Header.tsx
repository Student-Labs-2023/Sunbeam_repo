import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import {
    CONTACT_PHONE,
    GIS_LINK,
    VK_LINK
} from '../../config/constants';

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
                <li><a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a></li>
                <li><img src="/png/2gis.png" alt="2gis" onClick={() => navigateTo(GIS_LINK)}/></li>
                <li><img src="/png/vk.png" alt="vk" onClick={() => navigateTo(VK_LINK)}/></li>
            </div>
        </nav>
    );
}

export default Header;
