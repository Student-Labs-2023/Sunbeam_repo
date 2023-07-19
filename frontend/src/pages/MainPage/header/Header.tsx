import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={require('../../../png/sun in header.png')} alt="Логотип" />
            </div>
            <div className={styles.layer}>
                <li><Link to="/schedule">Расписание</Link></li>
                <li><Link to="/news">Новости</Link></li>
                <li><Link to="/works">Наши работы</Link></li>
                <li><Link to="/art-shop">Арт-лавка</Link></li>
                <li><Link to="/about">О нас</Link></li>
            </div>
            <div className={styles.layer2}>
                <li> <a> +7 (913) 640-03-69 </a> </li>
                {/* сюда добавить клики на 2гис и вк*/}
                <li> <img src={require('../../../png/2гис.png')} alt="Логотип" /> </li>
                <li> <img src={require('../../../png/вк.png')} alt="Логотип" /> </li>
            </div>
        </header>
    );
}

export default Header;