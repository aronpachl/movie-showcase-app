import { Entypo } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { GENRES } from '../constants/genres'
import { Movie } from '../types/movie'

type Props = {
  item: Movie
}

function MovieDetails({ item }: Props) {
  return (
    <Animated.View
      key={`details-${item.id}`}
      entering={FadeIn}
      exiting={FadeOut}
      style={{ maxWidth: '80%' }}
    >
      <Text style={style.text}>
        {item.genre_ids.map((id: number) => GENRES[id]).join(', ')}
      </Text>
      <Text style={style.title}>{item.title}</Text>
      <View
        style={{ flexDirection: 'row', columnGap: 4, alignItems: 'center' }}
      >
        <Text style={style.text}>
          {new Date(item.release_date).getFullYear()}
        </Text>
        <Entypo name="dot-single" size={14} color="white" />
        <Text style={style.text}>1h 51m</Text>
        <Entypo name="dot-single" size={14} color="white" />
        <View
          style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}
        >
          <Entypo name="star" size={8} color="white" />
          <Text style={style.text}>{item.vote_average}</Text>
        </View>
      </View>
    </Animated.View>
  )
}

const style = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 12,
    color: 'white',
  },
  text: {
    fontSize: 10,
    color: 'white',
  },
})

export default MovieDetails
