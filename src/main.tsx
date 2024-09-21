import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { store, unauthorize } from './redux/store'

import "@fontsource-variable/archivo"
import "@fontsource-variable/inter"

import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { refreshAuth } from "src/services/api/endpoints"

import { Router } from './navigation/router'


const onError = async (error, query) => {
  
  if (error instanceof AxiosError && error.response?.status === 401) {
    try {
      await refreshAuth()
      queryClient.invalidateQueries(query.queryKey)
    }
    catch (tokenError) {
      console.error('Token refresh failed:', tokenError)
      store.dispatch(unauthorize())
      window.location.href = '/login'
      window.location.reload()
    }
  }
}


const queryCache = new QueryCache({
  onError: onError,
})


const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 300000,
    },
    mutations: {
      onError: onError
    }
  }
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <Router />
      </QueryClientProvider>
  </Provider>
)