import { moviesApiInstance } from '../../../api/api'
import { Movie } from './types'

const moviesApiKey = process.env.MOVIES_API_KEY

export const moviesApi = {
  getTop250Movies: () =>
    moviesApiInstance
      .get<{ items: Movie[] }>(`/API/Top250Movies/${moviesApiKey}`)
      .then(({ data }) => data)
}
