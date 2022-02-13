import React from 'react'

import { Movie } from '../common'
import { MovieCard } from '../movie-card'
import styles from './movie-list.styles.module.scss'

type Props = {
  data?: Movie[]
}

export const MoviesList: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      {data?.slice(0, 10).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
