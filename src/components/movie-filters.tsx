import { SafeAreaView } from 'moti'
import { Pressable, Text, View, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { GENRES } from '../constants/genres'
import { filterLayout$ } from '../state/filter-layout'

const _spacing = 12

type Option = {
  id: number
  value: string
}

function FilterItems({
  title,
  options,
  onPress,
}: {
  title: string
  options: Option[]
  onPress: (value: string) => void
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
      >
        {options.map((o) => {
          return (
            <Pressable
              key={`option-${o.id}`}
              onPress={() => onPress(String(o.id))}
            >
              <Text
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
            </Pressable>
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
          onPress={() => {}}
        />
        <FilterItems
          title="Genre"
          options={Object.entries(GENRES).map(([id, genre]) => ({
            id: Number(id),
            value: genre,
          }))}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  )
}

export default MovieFilters
