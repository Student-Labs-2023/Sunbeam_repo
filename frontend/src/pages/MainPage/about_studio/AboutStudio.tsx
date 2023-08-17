import React from 'react';
import styles from "./aboutstudio.module.css";

function AboutStudio() {
    return (
        <div className={styles.about_studio}>
                <div className={styles.caption}>
                    О студии
                    <div className={styles.our_goal}>
                        Наша цель - это помощь и поддержка детей в различных жизненных ситуациях, путем
                        <br/>  вовлечения в творческий процесс.
                    </div>
                    <div className={styles.u_nas}>
                        У нас занимаются дети с особенностями, такими как РАС и ДЦП, а также дети из <br/>
                        разных социальных слоёв. Приходя в нашу студию, они обучаются основам <br/>
                        изобразительного и декоративно-прикладного искусства под руководством <br/>
                        опытных преподавателей
                    </div>
                    <div className={styles.v_nashey}>
                        В нашей студии все дети равны и <br/>
                        занимаются вместе, тем самым, <br/>
                        улучшая свои коммуникативные <br/>
                        навыки
                    </div>
                </div>
            <img className={styles.risunok} src="/png/Rectangle_23.png" alt="рисунок с цветком" />

            <img  className={styles.radi} src="/png/mi_radi_videt_vseh.png" alt="рисунок с цветком" />

            <img className={styles.mark} src="/png/-.png" alt="желтое подчеркивание" />

            <img className={styles.heart1} src="/png/heart.png" alt="первое сердечко" />

            <img className={styles.heart2} src="/png/heart2.png" alt="второе сердечко" />

            <img className={styles.zavitushka} src="/png/zavitushka.png" alt="завитушка" />
        </div>
    );
}

export default AboutStudio;