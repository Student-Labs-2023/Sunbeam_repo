import React, {useState} from 'react';
import styles from "../our_program/ourprogram.module.css";
import {useNavigate} from "react-router-dom";

function OurProgram() {

    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        if (path === '/schedule') {
            navigate(path);
        }
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex(Math.max(currentIndex - 1, 0));
    };

    const nextSlide = () => {
        const maxIndex = programs.length - 1;
        if (currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const programs = [
        {
            image: '/png/ourprogram1.png',
            caption: '4 года',
            description: 'Ранее творческое развитие',
        },
        {
            image: '/png/ourprogram2.png',
            caption: '5-6 лет',
            description: 'Художественное творчество',
        },
        {
            image: '/png/ourprogram3.png',
            caption: '7-8 лет',
            description: 'Основы художественного образования',
        },
        {
            image: '/png/ourprogram1.png',
            caption: '8-9 лет',
            description: 'Основы художественного образования',
        },
        {
            image: '/png/ourprogram4.png',
            caption: '10-11 лет',
            description: 'Основы художественного образования',
        },
        {
            image: '/png/ourprogram5.png',
            caption: 'Для детей любого возраста',
            description: 'Индивидуальные коррекционные занятия',
        },
    ];

    return (
        <div className={styles.ourprogram}>
            <div className={styles.caption}>
                Наши программы
            </div>
            <img src="/png/zavitushka2.png" alt="завитушка" className={styles.zavitushka2} />
            <div className={styles.circle_frames}>
                <div className={styles.firstryad}>
                    <div className={styles.circle_frame1}>
                        <img src="/png/ourprogram1.png" alt="наши программы" className={styles.perviyrisunok} />
                        <div className={styles.text_caption}> Для детей 4 лет </div>
                        <div className={styles.text_creation}> Ранее творческое <br/> развитие</div>
                        <div onClick={() => navigateTo('/schedule')} className={styles.schedule}>
                            Расписание
                        </div>
                    </div>

                    <div className={styles.circle_frame2}>
                        <img src="/png/ourprogram2.png" alt="наши программы" className={styles.vtoroyrisunok} />
                        <div className={styles.text_caption}> Для детей 5-6 лет </div>
                        <div className={styles.text_creation}> Художественное <br/> творчество</div>
                        <div onClick={() => navigateTo('/schedule')} className={styles.schedule}>
                            Расписание
                        </div>
                    </div>

                    <div className={styles.circle_frame3}>
                        <img src="/png/ourprogram3.png" alt="наши программы" className={styles.tretiyrisunok} />
                        <div className={styles.text_caption}> Для детей 7-8 лет </div>
                        <div className={styles.text_creation}> Основы художественного <br/> образования</div>
                        <div onClick={() => navigateTo('/schedule')} className={styles.schedule}>
                            Расписание
                        </div>
                    </div>
                </div>
                <div className={styles.secondryad}>
                    <div className={styles.circle_frame4}>
                        <img src="/png/ourprogram1.png" alt="наши программы" className={styles.perviyrisunok} />
                        <div className={styles.text_caption}> Для детей 8-9 лет </div>
                        <div className={styles.text_creation}> Основы художественного <br/> образования</div>
                        <div onClick={() => navigateTo('/schedule')} className={styles.schedule}>
                            Расписание
                        </div>
                    </div>

                    <div className={styles.circle_frame5}>
                        <img src="/png/ourprogram4.png" alt="наши программы" className={styles.vtoroyrisunok} />
                        <div className={styles.text_caption}>  Для детей 10-11 лет </div>
                        <div className={styles.text_creation}> Основы художественного <br/> образования</div>
                        <div onClick={() => navigateTo('/schedule')} className={styles.schedule}>
                            Расписание
                        </div>
                    </div>

                    <div className={styles.circle_frame6}>
                        <img src="/png/ourprogram5.png" alt="наши программы" className={styles.tretiyrisunok} />
                        <div className={styles.text_caption}> Для детей любого возраста </div>
                        <div className={styles.text_creation}> Индивидуальные <br/> коррекционные занятия </div>
                        <div onClick={() => navigateTo('/schedule')} className={styles.schedule}>
                            Расписание
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.circle_frames_mobile}>
                <div className={styles.carousel}>
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            className={styles.circle_frame}
                            style={{ display: currentIndex === index ? 'block' : 'none' }}
                        >
                            <img src={program.image} alt={program.caption} className={styles.risunok} />
                            <div className={styles.text_caption}>{program.caption}</div>
                            <div className={styles.text_creation}>{program.description}</div>
                            <div onClick={() => navigateTo('/schedule')} className={styles.schedule}>
                                Расписание
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.modal_nav_buttons}>
                    <button className={styles.modal_nav_button} onClick={prevSlide}>
                        <img src="/png/left_button.png" alt="left_button" />
                    </button>
                    <div className={styles.dot_indicator}>
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className={`${styles.dot} ${index === currentIndex ? styles.active_dot : ''}`}
                            />
                        ))}
                    </div>
                    <button className={styles.modal_nav_button} onClick={nextSlide}>
                        <img src="/png/right_button.png" alt="right_button"/>
                    </button>
                </div>
            </div>
            <img src="/png/zavitushka4.png" alt="завитушка" className={styles.zavitushka4} />
        </div>
    );
}

export default OurProgram;