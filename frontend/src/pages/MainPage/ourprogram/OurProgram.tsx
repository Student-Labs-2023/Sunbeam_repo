import React from 'react';
import styles from "../ourprogram/ourprogram.module.css";

function OurProgram() {
    return (
        <div className={styles.about_studio}>
            <div className={styles.lyambda}>
                <img src={require('../../../png/-.png')} alt="Логотип" />
            </div>
            {/*<div className={styles.caption}>
                О студии
            </div>
            <div className={styles.our_goal}>
                Наша цель - это помощь и поддержка детей в различных жизненных ситуациях, путем вовлечения в творческий процесс.
            </div>
            <div className={styles.our_goal2}>
                У нас занимаются дети с особенностями, такими как РАС и ДЦП, а также дети из разных социальных слоёв.
                Приходя в нашу студию, они обучаются основам  изобразительного и декоративно-прикладного искусства под руководством опытных преподавателей
            </div>
            <div className={styles.our_goal3}>
                В нашей студии все дети равны и занимаются вместе, тем самым, улучшая свои коммуникативные навыки
            </div>*/}
            <div className={styles.image}>
                <img src={require('../../../png/Rectangle 23.png')} alt="Логотип" />
            </div>
            <div className={styles.we_happy}>
                <img src={require('../../../png/мы рады видеть всех.png')} alt="Логотип" />
            </div>
        </div>
    );
}

export default OurProgram;