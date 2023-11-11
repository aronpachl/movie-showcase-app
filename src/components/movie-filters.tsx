import { SafeAreaView } from 'moti'
import { Button, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { GENRES } from '../constants/genres'
import { filterLayout$ } from '../state/filter-layout'
import { moviesParams$ } from '../state/movies'

const _spacing = 12

function MovieFilters() {
  return (
    <SafeAreaView
      style={{ backgroundColor: '#fff', flex: 1, position: 'absolute' }}
    >
      <View
        style={{ padding: _spacing }}
        onLayout={(e) => {
          const { y, height } = e.nativeEvent.layout
          const containerHeight = height + y

          filterLayout$.assign({
            height: containerHeight,
          })
        }}
      >
        <Text>Year</Text>
        <ScrollView horizontal>
          {[...Array(10).keys()].map((y) => {
            const year = 2023 - y
            return (
              <Button
                key={`year-${year}`}
                onPress={() => {
                  moviesParams$.assign({
                    year,
                  })
                }}
                title={String(year)}
              />
            )
          })}
        </ScrollView>
        <Text>Genre</Text>
        <ScrollView horizontal>
          {Object.entries(GENRES).map(([id, genre]) => {
            return (
              <Button
                key={`genre-${id}`}
                onPress={() => {
                  console.log('press', genre, id)
                  moviesParams$.assign({
                    genre: String(id),
                  })
                }}
                title={genre}
              />
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default MovieFilters
