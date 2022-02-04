import axios from 'axios'

export const moviesApiInstance = axios.create({
  baseURL: 'https://imdb-api.com/en/'
})
