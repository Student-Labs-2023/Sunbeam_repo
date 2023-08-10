import styles from './styles.module.css'

interface Params {
  title: string;
  imageUrl: string;
}

function Work(params: Params) {
  return (
    <div className={styles.work}>
      <img src={process.env.REACT_APP_API_URL + params.imageUrl} />
      <div>{params.title}</div>
    </div>
  )
}

export default Work
