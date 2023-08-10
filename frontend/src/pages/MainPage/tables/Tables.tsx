import React from 'react';
import styles from "../tables/tables.module.css";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

function Tables() {
    return (
        <div className={styles.tables}>
            <h2 className={styles.mesta}>
                Мы представляем бесплатные места для социальной категории семей. <br/>
                Услуга оказывается безвозмездно, за счет средств студии
            </h2>

            <div className={styles.frames}>
                <div className={styles.frame1}>
                    <ul>
                        <li> дети, потерявшие одного из родителей </li>
                        <li> дети-сироты </li>
                        <li> дети участников СВО </li>
                    </ul>
                </div>
                <div className={styles.frame2}>
                    <ul>
                        <li> дети из малоимущих семей </li>
                        <li> дети из многоодетных семей </li>
                        <li> дети матерей-одиночек </li>
                    </ul>
                </div>
                <div className={styles.frame3}>
                    <ul>
                        <li> дети, имеющие инвалидность (в том <br/> числе с РАС и ДЦП) </li>
                        <li> дети, родители которых являются инвалидами </li>
                    </ul>
                </div>
            </div>
            <div className={styles.price}>
                Если вы хотите у нас заниматься, но не входите ни в одну из категорий,<br/>
                то можете записаться на занятия на платной основе
            </div>
            <div className={styles.button_price}>
                {/*добавить потом модальное окно если оно будет*/}
                Подробнее о стоимости
            </div>
            <div className={styles.flower}>
                <img src="/png/flower2.png" alt="цветок" />
            </div>
            <div className={styles.lyambda}>
                <img src="/png/another_lyambda.png" alt="лямбда" />
            </div>
        </div>
    );
}

export default Tables;