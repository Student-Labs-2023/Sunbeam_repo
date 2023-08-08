import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import '@fontsource/roboto/400.css';

function Header() {

    const navigate = useNavigate();

    const clickHandler= () => {
        navigate('/');
    };

    const clickHandler1= () => {
        window.open('https://2gis.ru/omsk/firm/70000001067193459?m=73.276957%2C55.046163%2F16', '_blank');
    };

    const clickHandler2 = () => {
        window.open('https://vk.com/club217238950', '_blank');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="/png/sun_in_header.png" alt="Логотип" onClick={clickHandler} />
            </div>
            <div className={styles.layer}>
                <li><Link to="/schedule">Расписание</Link></li>
                <li><Link to="/news">Новости</Link></li>
                <li><Link to="/works">Наши работы</Link></li>
                <li><Link to="/art-shop">Арт-лавка</Link></li>
                <li><Link to="/about_us">О нас</Link></li>
            </div>
            <div className={styles.layer2}>
                <li> <a> +7 (913) 640-03-59 </a> </li>
                <li> <img src="/png/2гис.png" alt="2гис" onClick={clickHandler1}/> </li>
                <li> <img src="/png/вк.png" alt="вк" onClick={clickHandler2}/> </li>
            </div>
        </header>
    );
}

export default Header;