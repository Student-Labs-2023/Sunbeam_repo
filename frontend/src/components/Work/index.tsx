import styles from './styles.module.css'

interface Author {
  full_name: string;
  age: number;
}

interface Params {
  title: string;
  author: Author;
  image: any;
}

function numeralOfAge(age: number) {
  if (age % 10 == 1) return 'год'
  if ([2, 3, 4].includes(age % 10)) return 'года'
  return 'лет'
}

function Work({ title, author, image }: Params) {

  return (
      <div className={styles.work}>
        <img src={process.env.REACT_APP_API_URL + image.url} />
        <div>{title}. {author.full_name}, {author.age} {numeralOfAge(author.age)}</div>
      </div>
  )
}

export default Work