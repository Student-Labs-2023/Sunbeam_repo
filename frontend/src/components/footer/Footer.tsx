import React from 'react';
import styles from '../footer/footer.module.css';

import {
    CONTACT_PHONE,
    CONTACT_ADDRESS,
    GIS_LINK,
    VK_LINK,
    COPYRIGHT_YEAR,
    LEGAL_INFO,
    OGRNIP
} from '../../config/constants';

function Footer({ isAbsolute }: { isAbsolute: boolean }) {

    const navigateTo = (path: string) => {
        window.open(path, '_blank');
    };

    const footerClassName = isAbsolute ? styles.footer_absolute : styles.footer_relative;

    return (
        <footer className={footerClassName}>
            <img src="/png/footer.png" alt="footer" className={styles.footerImg} />
            <div className={styles.firstryad}>
                <ul className={styles.contactList}>
                    <li className={styles.phone}>{CONTACT_PHONE}</li>
                    <li className={styles.address}>{CONTACT_ADDRESS}</li>
                    <div className={styles.links}>
                        <li><img src="/png/2gis.png" alt="2gis" onClick={() => navigateTo(GIS_LINK)}/></li>
                        <li><img src="/png/vk.png" alt="vk" onClick={() => navigateTo(VK_LINK)}/></li>
                    </div>
                </ul>
            </div>
            <div className={styles.secondryad}>
                <ul>
                    <li>© Луч солнца, {COPYRIGHT_YEAR}</li>
                    <li>{LEGAL_INFO}</li>
                    <li>ОГРНИП: {OGRNIP}</li>
                </ul>
            </div>
            <img src="/png/payments.png" alt="платежные системы" className={styles.payments}/>
            <div className={styles.luch_solntsa}>
                © Луч солнца, {COPYRIGHT_YEAR}
            </div>
        </footer>
    );
}

export default Footer;
