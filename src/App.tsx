import { enableReactTracking } from '@legendapp/state/config/enableReactTracking'
import { QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Movies from './components/movies'
import { queryClient } from './config/query-client'

enableReactTracking({
  auto: true,
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Movies />
      </GestureHandlerRootView>
      <StatusBar style="light" />
    </QueryClientProvider>
  )
}
