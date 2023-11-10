import { QueryClient } from '@tanstack/react-query'
import { defaultQueryFn } from './default-fn'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})
