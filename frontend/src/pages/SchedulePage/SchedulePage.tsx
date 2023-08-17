import React, { useEffect, useState } from 'react';
import styles from "../SchedulePage/schedulepage.module.css";
import { ISchedule } from "../../models/models";
import { getSchedule } from "../../api/api";

function SchedulePage() {
    const [loading, setLoading] = useState(true);
    const [scheduleData, setScheduleData] = useState<ISchedule[]>([]);
    const [modalStates, setModalStates] = useState<boolean[]>([]);

    useEffect(() => {
        setLoading(true);
        getSchedule()
            .then((response: ISchedule[]) => {
                setLoading(false);
                setScheduleData(response);
                setModalStates(response.map(() => false));
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    const uniqueDays = Array.from(new Set(scheduleData.map(schedule => schedule.day)));

    // Порядок дней недели
    const usualDayOrder = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    // Массив дней недели, отсортированный в соответствии с обычным порядком
    const sortedDays = [...usualDayOrder.filter(day => uniqueDays.includes(day))];

    const groupedSchedule: { [day: string]: ISchedule[] } = {};
    scheduleData.forEach((schedule) => {
        const day = schedule.day;
        if (!groupedSchedule[day]) {
            groupedSchedule[day] = [];
        }
        groupedSchedule[day].push(schedule);
    });

    // Чтобы когда учитель добавлял время ниже другого, оно отображалось корректно
    sortedDays.forEach(day => {
        groupedSchedule[day]?.sort((a, b) => a.time.localeCompare(b.time));
    });

    return (
        <div className={styles.schedule}>
            <div className={styles.centerText}>Расписание</div>
            <img src="/png/heart_schedule.png" className={styles.heart} alt="heart"/>
            {loading ? (
                <h1>Загрузка расписания</h1>
            ) : (
                <div>
                    <div className={styles.daysRow}>
                        {sortedDays.map((day, dayIndex) => (
                            <div key={dayIndex} className={styles.dayColumn}>
                                <div className={styles.dayContainer}>
                                    <div className={styles.dayOfWeek}>{day}</div>
                                    <div className={styles.daySchedule}>
                                        {groupedSchedule[day]?.map((schedule: ISchedule, index) => (
                                            <div key={schedule.id} className={styles.scheduleWrapper}>
                                                <div className={styles.header}> {schedule.header} </div>
                                                <div className={styles.childrens}> {schedule.number_of_children} человека<br/> в группе <br/> </div>
                                                <img src="/png/line.png" className={styles.line} alt="line"/>
                                                <div className={styles.time}>{schedule.time}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <img src="/png/zavitushka_schedule.png" className={styles.zavitushka} alt="zavitushka"/>
                </div>
            )}
        </div>
    );
}

export default SchedulePage;