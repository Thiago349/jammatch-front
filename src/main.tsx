import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';
import { store } from './redux/store';

import "@fontsource-variable/archivo";
import "@fontsource-variable/inter";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Router } from './navigation/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 300000
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