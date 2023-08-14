import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client'
import Work from '../../components/Work'
import styles from './styles.module.css'

const GET_OUR_WORKS = gql`
  query GetOurWorks {
    orders {
      data {
        attributes {
          picture {
            data {
              attributes {
                title,
                image {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

function OurWorks() {
  const { loading, error, data } = useQuery(GET_OUR_WORKS)

  if (!loading && !error) {
    const works = data.orders.data.map((work: any) => ({
      title: work.attributes.picture.data.attributes.title,
      imageUrl: work.attributes.picture.data.attributes.image.data[0].attributes.formats.thumbnail.url,
    }))

    return (
      <div>
        <h1 style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 'fit-content'
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
