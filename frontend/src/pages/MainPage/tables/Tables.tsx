import React from 'react';
import styles from "../tables/tables.module.css";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
function Tables() {
    return (
        <div className={styles.tables}>
            <div className={styles.mesta}>
                Мы представляем бесплатные места для социальной категории семей. <br/>
                <a> Услуга оказывается безвозмездно, за счет средств студии </a>
            </div>
            <div className={styles.another_zavitushka}>
                <img src="/png/anotherzavitushka.png" alt="завитушка" />
            </div>
            <div className={styles.frames}>
                <img src="/png/Frame 74.png" alt="первый фрэйм" />
                <img src="/png/Frame 73.png" alt="второй фрэйм" />
                <img src="/png/Frame 75.png" alt="третий фрэйм" />
            </div>
            <div className={styles.price}>
                Если вы хотите у нас заниматься, но не входите ни в одну из категорий,<br/>
                <a> то можете записаться на занятия на платной основе </a>
                <div className={styles.button_price}>
                    {/*добавить потом модальное окно если оно будет*/}
                    Подробнее о стоимости
                </div>
            <div className={styles.flower}>
                <img src="/png/flower2.png" alt="цветок" />
            </div>
            <div className={styles.lyambda}>
                <img src="/png/another_lyambda.png" alt="цветок" />
            </div>
            </div>
        </div>
    );
}

export default Tables;