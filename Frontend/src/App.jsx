import React from 'react'
import Route from './Routing/Routing'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Route />
    </QueryClientProvider>
  )
}

export default App