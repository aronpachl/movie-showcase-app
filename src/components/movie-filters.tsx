import { SafeAreaView } from 'moti'
import { Text, View, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { GENRES } from '../constants/genres'
import { filterLayout$ } from '../state/filter-layout'
import { moviesParams$ } from '../state/movies'

const _spacing = 12

type Option = {
  id: number
  value: string
}

function FilterItems({
  title,
  options,
  onSelect,
}: {
  title: string
  options: Option[]
  onSelect: (value: string) => void
}) {
  const { width } = useWindowDimensions()
  return (
    <View style={{ alignItems: 'center' }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: 'rgba(0, 0, 0, 0.5)',
          width,
          textAlign: 'center',
        }}
      >
        {title.toUpperCase()}
      </Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const selected = Math.floor(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width,
          )
          onSelect(String(options[selected].id))
        }}
      >
        {options.map((o) => {
          return (
            <Text
              key={`option-${o.id}`}
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#000',
                marginVertical: 12,
                width: width,
                textAlign: 'center',
              }}
            >
              {o.value}
            </Text>
          )
        })}
      </ScrollView>
    </View>
  )
}

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
        <FilterItems
          title="Year"
          options={[...Array(10).keys()].map((i) => ({
            id: 2023 - i,
            value: String(2023 - i),
          }))}
          onSelect={(year) => {
            moviesParams$.assign({
              year: Number(year),
            })
          }}
        />
        <FilterItems
          title="Genre"
          options={Object.entries(GENRES).map(([id, genre]) => ({
            id: Number(id),
            value: genre,
          }))}
          onSelect={(genre) => {
            moviesParams$.assign({
              genre: genre,
            })
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default MovieFilters
