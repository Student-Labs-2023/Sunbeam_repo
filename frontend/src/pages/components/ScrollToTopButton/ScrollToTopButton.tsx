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
        // Показываем кнопку только когда пользователь прокрутил страницу вниз на определенное расстояние
        setIsVisible(window.scrollY > 4000);
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