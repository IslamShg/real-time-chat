import React, { FC } from 'react'
import { Movie } from '../common'

import styles from './movie-card.module.scss'

type Props = {
  movie: Movie
}

export const MovieCard: FC<Props> = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img className={styles.bgImage} src={movie.image} alt='' />
    </div>
  )
}
