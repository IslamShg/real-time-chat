type TypeMainState = {
  isLoading: boolean
}

type TypePostsState = {
  isLoading: boolean
}

type TypeState = TypeMainState | TypePostsState

export { TypeState }
