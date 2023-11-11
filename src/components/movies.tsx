import { useEffect, useRef } from 'react'
import { FlatList, View, useWindowDimensions } from 'react-native'
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useMovies } from '../hooks/use-movies'
import { pagination$ } from '../state/carousel'
import { filterLayout$ } from '../state/filter-layout'
import Loader from './loader'
import MovieDetails from './movie-details'
import MovieFilters from './movie-filters'
import MoviePoster from './movie-poster'
import Pagination from './pagination'

function Movies() {
  const flatListRef = useRef<FlatList>(null)
  const { height } = useWindowDimensions()
  const { isLoading, data, isFetching } = useMovies()
  const current = pagination$.current.get()
  const filtersHeight = filterLayout$.height.get()
  const filterAnimation = useSharedValue(0)
  const movieListStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: filterAnimation.value,
        },
      ],
      borderRadius: interpolate(
        filterAnimation.value,
        [0, filtersHeight],
        [0, 24],
      ),
    }
  })

  useEffect(() => {
    if (data) {
      pagination$.assign({
        total: data.length,
        current: 0,
      })
      flatListRef?.current?.scrollToOffset?.({
        offset: 0,
        animated: false,
      })
    }
  }, [data])

  if (isLoading || !data) return null

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      filterAnimation.value = withTiming(filtersHeight)
    })
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      filterAnimation.value = withTiming(0)
    })

  const tap = Gesture.Tap().onStart(() => {
    filterAnimation.value = withTiming(0)
  })

  return (
    <View style={{ flex: 1 }}>
      <MovieFilters />
      <GestureDetector
        gesture={Gesture.Exclusive(flingDown, Gesture.Race(flingUp, tap))}
      >
        <Animated.View
          style={[
            movieListStyle,
            { overflow: 'hidden', flex: 1, backgroundColor: '#000' },
          ]}
        >
          <FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            bounces={false}
            data={data || []}
            keyExtractor={(movie) => String(movie.id)}
            renderItem={({ item }) => {
              return <MoviePoster item={item} />
            }}
            onMomentumScrollEnd={(e) => {
              pagination$.assign({
                current: Math.floor(
                  e.nativeEvent.contentOffset.x /
                    e.nativeEvent.layoutMeasurement.width,
                ),
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
            pointerEvents="box-none"
          >
            <Pagination />
            <MovieDetails item={data[current]} />
          </View>
          {isFetching && <Loader />}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

export default Movies
