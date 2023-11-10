import { enableReactTracking } from '@legendapp/state/config/enableReactTracking'
import { QueryClientProvider } from '@tanstack/react-query'
import { View } from 'moti'
import Movies from './components/movies'
import { queryClient } from './config/query-client'

enableReactTracking({
  auto: true,
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <Movies />
      </View>
    </QueryClientProvider>
  )
}