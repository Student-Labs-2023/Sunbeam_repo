import React from 'react';
import styles from './whydrawingisgood.module.css'
import '@fontsource/roboto/400.css';

function WhyDrawingIsGood() {
    return (
        <div className={styles.whydrawingisgood}>
            <div className={styles.caption}>
                Почему рисовать полезно
            </div>
            <div className={styles.first_ryad}>
                <div className={styles.circle_frame1}>
                    <div className={styles.text}> Учит быть нацеленным на результат </div>
                </div>
                <div className={styles.circle_frame2}>
                    <div className={styles.text}> Позволяет справиться со стрессом </div>
                </div>
                <div className={styles.circle_frame3}>
                    <div className={styles.text}> Помогает лучше учиться </div>
                </div>
            </div>
            <div className={styles.second_ryad}>
                <div className={styles.circle_frame4}>
                    <div className={styles.text}> Развивает воображение, пространственное и ассоциативное мышление  </div>
                </div>
                <div className={styles.circle_frame5}>
                    <div className={styles.text}> Позволяет самовыражаться через рисунок </div>
                </div>
            </div>
            <div className={styles.third_ryad}>
                <div className={styles.circle_frame6}>
                    <div className={styles.text}> Улучшает память и внимание </div>
                </div>
                <div className={styles.circle_frame7}>
                    <div className={styles.text}> Развивает мелкую моторику </div>
                </div>
                <div className={styles.circle_frame8}>
                    <div className={styles.text}> Дает эмоциональную устойчивость </div>
                </div>
            </div>
            <img src="/png/cat.png" alt="кот" className={styles.cat} />
            <img src="/png/zavitushka5.png" alt="завитушка" className={styles.zavitushka5} />
        </div>
    );
}

export default WhyDrawingIsGood;