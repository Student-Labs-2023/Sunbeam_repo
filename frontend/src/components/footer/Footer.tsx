import React from 'react';
import styles from '../footer/footer.module.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/300.css';
import {
    CONTACT_PHONE,
    CONTACT_ADDRESS,
    GIS_LINK,
    VK_LINK,
    COPYRIGHT_YEAR,
    LEGAL_INFO,
    OGRNIP
} from '../../config/constants';

function Footer() {

    const navigateTo = (path: string) => {
        window.open(path, '_blank');
    };

    return (
        <div className={styles.footer}>
            <img src="/png/footer.png" alt="footer" className={styles.footerImg} />
            <nav className={styles.information}>
                <div className={styles.firstryad}>
                    <li className={styles.phone}> {CONTACT_PHONE} </li>
                    <li className={styles.address}> {CONTACT_ADDRESS} </li>
                    <div className={styles.links}>
                        <li><img src="/png/2гис.png" alt="2гис" onClick={() => navigateTo(GIS_LINK)}/></li>
                        <li><img src="/png/вк.png" alt="вк" onClick={() => navigateTo(VK_LINK)}/></li>
                    </div>
                </div>
                <div className={styles.secondryad}>
                    <li> © Луч солнца, {COPYRIGHT_YEAR} </li>
                    <li> {LEGAL_INFO} </li>
                    <li> ОГРНИП: {OGRNIP} </li>
                </div>
                <img src="/png/payments.png" alt="платежные системы" className={styles.payments}/>
            </nav>
        </div>
    );
}

export default Footer;
