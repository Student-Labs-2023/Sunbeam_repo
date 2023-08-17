import React from 'react';
import styles from "../footer/footer.module.css";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/300.css';

function Footer() {

    const navigateTo = (path: string) => {
        window.open(path, '_blank');
    };

    return (
        <div className={styles.footer}>
            <img src="/png/footer.png" alt="footer" className={styles.footerImg} />
            <nav className={styles.information}>
                <div className={styles.firstryad}>
                    <li className={styles.phone}> +7 (913) 640-03-59 </li>
                    <li className={styles.address}> г. Омск, ул. Энергетиков, 70 </li>
                    <div className={styles.links}>
                        <li><img src="/png/2гис.png" alt="2гис" onClick={() => navigateTo('https://2gis.ru/omsk/firm/70000001067193459?m=73.276957%2C55.046163%2F16')}/></li>
                        <li><img src="/png/вк.png" alt="вк" onClick={() => navigateTo('https://vk.com/club217238950')}/></li>
                    </div>
                </div>
                <div className={styles.secondryad}>
                    <li> © Луч солнца, 2023 </li>
                    <li> ИП Рыбин Д. А. </li>
                    <li> ОГРНИП: 320723200066545 </li>
                </div>
                <img src="/png/payments.png" alt="платежные системы" className={styles.payments}/>
            </nav>
        </div>
    );
}

export default Footer;