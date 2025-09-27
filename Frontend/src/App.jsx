import React from 'react'
import Route from './Routing/Routing'
import MyContextComponent from './context/MyContextComponent'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import SocketContext from './context/SocketProvider'
const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SocketContext>
        <MyContextComponent>
          <Route />
        </MyContextComponent>
      </SocketContext>
    </QueryClientProvider>
  )
}

export default App