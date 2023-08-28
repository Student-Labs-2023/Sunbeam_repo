import React, { useEffect, useState } from 'react';
import { INew } from "../../models/models";
import { getNews } from "../../api/api";
import styles from "../NewsPage/newspage.module.css";
import ModalNew from '../../components/modal/ModalNew';

function NewsPage() {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<INew[]>([]);
    const [modalStates, setModalStates] = useState<boolean[]>([]);

    useEffect(() => {
        setLoading(true);
        getNews()
            .then((response: INew[]) => {
                setLoading(false);
                setNews(response);
                setModalStates(response.map(() => false));
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    const groupedNews: { [day: string]: INew[] } = {};
    news.forEach((newsItem) => {
        const day = newsItem.new_published_at;
        if (!groupedNews[day]) {
            groupedNews[day] = [];
        }
        groupedNews[day].push(newsItem);
    });

    const monthNames = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${monthNames[month]} ${year}`;
    };

    const openModal = (newsIndex: number) => {
        const updatedStates = [...modalStates];
        updatedStates[newsIndex] = true;
        setModalStates(updatedStates);
    };

    const closeModal = (newsIndex: number) => {
        const updatedStates = [...modalStates];
        updatedStates[newsIndex] = false;
        setModalStates(updatedStates);
    };

    return (
        <div className={styles.news}>
            <div className={styles.centerText}>Новости</div>
            {loading ? (
                <h1>Загрузка новостей</h1>
            ) : (
                <div className={styles.newsRow}>
                    {Object.keys(groupedNews).map((day, newsIndex) => (
                        <div key={newsIndex} className={styles.newColumn}>
                            {groupedNews[day]?.map((news: INew, index) => (
                                <div key={news.id} className={styles.newsWrapper} >
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}${news.images[0].url}`}
                                        className={styles.image}
                                        alt="image_from_server" onClick={() => openModal(newsIndex)}
                                    />
                                    <div className={styles.header} onClick={() => openModal(newsIndex)}>{news.header}</div>
                                    <div className={styles.content} onClick={() => openModal(newsIndex)}>{news.content}</div>
                                    <div className={styles.publishedAt}>
                                        {formatDate(news.new_published_at)}
                                    </div>
                                    <ModalNew isOpen={modalStates[newsIndex]} onRequestClose={() => closeModal(newsIndex)} news={news} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewsPage;
