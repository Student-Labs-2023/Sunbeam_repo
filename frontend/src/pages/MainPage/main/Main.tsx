import React from 'react';
import styles from './main.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('/schedule');
    };

    return (
        <div className={styles.smiles}>
            <a> Мы за</a>
            <div className={styles.flower}>
                <img src={require('../../../png/цветок.png')} alt="Логотип" />
            </div>
            <div className={styles.child_smiles}>
                <img src={require('../../../png/детские улыбки.png')} alt="Логотип" />
            </div>
            <div className={styles.studio}>
                <div> Социальная студия изобразительных искусств </div>
                <div> “Луч солнца” </div>
            </div>
            <div className={styles.home}>
                <img src={require('../../../png/домик.png')} alt="Логотип" />
            </div>
            <div className={styles.button}>
                <img
                    src={require('../../../png/кнопка.png')}
                    alt="Логотип"
                    onClick={clickHandler}
                />
                <Link to="/schedule"></Link>
            </div>
        </div>
    );
}

export default Main;
