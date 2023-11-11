import { Image } from 'expo-image'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
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
      }}
    >
      <Image
        source={{
          uri: getImagePath(item.backdrop_path),
        }}
        contentFit="cover"
        transition={1000}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        ]}
      ></View>
    </View>
  )
}

export default Movie
