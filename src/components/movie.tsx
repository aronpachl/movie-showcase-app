import { Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import type { Movie } from '../types/movie'
import { getImagePath } from '../utils/get-image-path'

type Props = {
  item: Movie
}

function Movie({ item }: Props) {
  const { width, height } = useWindowDimensions()

  return (
    <View
      style={{
        flex: 1,
        width,
        height,
        backgroundColor: '#000',
      }}
    >
      <Image
        source={{
          uri: getImagePath(item.backdrop_path),
        }}
        resizeMode="cover"
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: 0.5,
          },
        ]}
      />
    </View>
  )
}

export default Movie
