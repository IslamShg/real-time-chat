import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import { store } from './slices/root-state'
import App from './App'

const queryClient = new QueryClient()

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  document.querySelector('#root')
)
