import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery'
import { moviesParams$ } from '../state/movies'
import { Movie } from '../types/movie'

export function useMovies() {
  const query$ = useObservableQuery<{ results: Movie[] }, Error, Movie[]>({
    queryKey: ['discover', '/', 'movie', moviesParams$.queryString.get()],
    select: (data) => data.results,
    keepPreviousData: true,
  })

  return query$.get()
}
