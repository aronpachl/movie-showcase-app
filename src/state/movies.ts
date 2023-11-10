import { computed, observable } from '@legendapp/state'
import { createQueryString } from '../utils/create-query-string'

export const moviesParams$ = observable({
  year: 2023,
  genre: 'action',
  page: 1,
  queryString: computed((): string => {
    const { year, genre, page } = moviesParams$.get()
    return createQueryString({
      year,
      genre,
      page,
    })
  }),
})
