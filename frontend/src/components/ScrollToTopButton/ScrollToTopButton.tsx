import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; // Подключите файл стилей для кнопки

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Добавляем плавность скролла
        });
    };

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        let scrollThreshold;


        if (screenWidth < 1600) {
            scrollThreshold = 3.7 * windowHeight;
        } else {
            scrollThreshold = 4.3 * windowHeight;
        }
        setIsVisible(window.scrollY > scrollThreshold);
    };

    useEffect(() => {
        // Добавляем обработчик события прокрутки при монтировании компонента
        window.addEventListener('scroll', handleScroll);

        // Отписываемся от обработчика события при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            className={`scroll-to-top-button ${isVisible ? 'show' : 'hide'}`}
            onClick={scrollToTop}
        >
            ^
        </button>
    );
};

export default ScrollToTopButton;