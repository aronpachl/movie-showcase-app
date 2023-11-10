import { FlatList, Text, View, useWindowDimensions } from 'react-native'
import { useMovies } from '../hooks/use-movies'
import { pagination$ } from '../state/carousel'
import Movie from './movie'
import MovieDetails from './movie-details'
import Pagination from './pagination'

function Movies() {
  const { height } = useWindowDimensions()
  const { isLoading, data } = useMovies()
  const current = pagination$.current.get()

  if (isLoading || !data) return <Text>Loading...</Text>

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal
        pagingEnabled
        data={data || []}
        keyExtractor={(movie) => String(movie.id)}
        renderItem={({ item }) => {
          return <Movie item={item} />
        }}
        onMomentumScrollEnd={(e) => {
          pagination$.assign({
            current:
              Math.floor(
                e.nativeEvent.contentOffset.x /
                  e.nativeEvent.layoutMeasurement.width,
              ) + 1,
          })
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          padding: 24,
          paddingBottom: height * 0.1,
          width: '100%',
          gap: 32,
          height: height * 0.3,
        }}
      >
        <Pagination />
        <MovieDetails item={data[current]} />
      </View>
    </View>
  )
}

export default Movies
