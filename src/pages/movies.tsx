import React from 'react'

import { MoviesList, useQueryTop250Movies } from '../features'

export const Movies = () => {
  const { data, isLoading, isError } = useQueryTop250Movies({ retry: false })
  console.log(data)

  if (isLoading) return <div>Loading</div>

  return !isError ? (
    <MoviesList data={data?.items} />
  ) : (
    <p>Error happened. Please, try reloading page</p>
  )
}
