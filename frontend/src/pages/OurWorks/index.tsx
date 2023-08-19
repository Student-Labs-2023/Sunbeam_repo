import { useState, useEffect } from 'react';
import Work from '../../components/Work'
import styles from './styles.module.css'
import axios from '../../axios'

function OurWorks() {
  const [orders, setOrders] = useState<any>()
  useEffect(() => {
    axios.get('/api/orders?populate[0]=picture.image&populate[1]=picture.author')
      .then((response: any) => setOrders(response.data.data))
  }, [])

  if (orders) {
    const works = orders.map((order: any) => order.picture)

    console.log(orders)

    return (
      <div>
        <h1 style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '90px',
          width: 'fit-content',
        }}>
          Работы наших учеников
        </h1>
        <div className={styles.worksContainer}>
          {works.map((work: any, i: number) => <Work {...work} key={i} />)}
        </div>
      </div>
    );
  } else return <></>;
}

export default OurWorks;
