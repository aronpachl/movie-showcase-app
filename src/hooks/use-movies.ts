import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery'
import { pagination$ } from '../state/carousel'
import { moviesParams$ } from '../state/movies'
import { Movie } from '../types/movie'

export function useMovies() {
  const query$ = useObservableQuery<{ results: Movie[] }, Error, Movie[]>({
    queryKey: ['discover', '/', 'movie', moviesParams$.queryString.get()],
    keepPreviousData: true,
    select: (data) => {
      pagination$.assign({
        total: data.results.length,
      })
      return data.results
    },
  })

  return query$.get()
}
