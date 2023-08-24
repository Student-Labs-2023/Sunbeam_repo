import React from 'react';
import styles from './main.module.css';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        if (path === '/schedule') {
            navigate(path);
        }
    };

    return (
        <div className={styles.smiles}>
            <img src="/png/beam.png" alt="1 луч" className={styles.beam} />
            <img src="/png/beam1.png" alt="2 луч" className={styles.beam1}/>
            <img src="/png/beam2.png" alt="2 луч" className={styles.beam2}/>
            <img src="/png/beam3.png" alt="3 луч" className={styles.beam3}/>
            <img src="/png/beam4.png" alt="4 луч" className={styles.beam4}/>
            <img src="/png/beam5.png" alt="5 луч" className={styles.beam5}/>
            <img src="/png/beam6.png" alt="6 луч" className={styles.beam6}/>
            <img src="/png/beam7.png" alt="7 луч" className={styles.beam7}/>
            <div className={styles.mi_za}>
                Мы за
            </div>
            <div>
                <img className={styles.flower} src="/png/цветок.png" alt="цветок" />
            </div>
            <div className={styles.child_smiles}>
                <img src="/png/detskie_ulibki.png" alt="детские улыбки" />
            </div>
            <div className={styles.studio}>
                Социальная студия изобразительных искусств <br/> “Луч солнца”
            </div>
            <div>
                <img src="/png/домик.png" className={styles.home} alt="домик" />
            </div>
            <div className={styles.button} onClick={() => navigateTo('/schedule')}>
                Узнать расписание
            </div>
            <div className={styles.lyambda}>
                <img src="/png/lyambda.png" alt="lyambda" />
            </div>
        </div>
    );
}

export default Main;
