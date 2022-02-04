import { useQuery, UseQueryOptions } from 'react-query'

import { TOP_250_MOVIES } from './constants'
import { moviesApi } from './movies.api'
import { Movie } from './types'

export const useQueryTop250Movies = (
  options: UseQueryOptions<{ items: Movie[] }>
) => {
  const data = useQuery(
    TOP_250_MOVIES,
    () => moviesApi.getTop250Movies(),
    options
  )
  return data
}
