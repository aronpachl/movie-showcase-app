import { Entypo } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated'
import { pagination$ } from '../state/carousel'

function Pagination() {
  const total = pagination$.total.get()
  const current = pagination$.current.get() + 1

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        gap: 4,
      }}
    >
      <Animated.Text
        key={`current-${current}`}
        entering={FadeInUp}
        exiting={FadeOutDown}
        style={[styles.text, styles.currentText]}
      >
        {current > 9 ? current : `0${current}`}
      </Animated.Text>
      <Entypo
        name="dot-single"
        size={14}
        color="white"
        style={{
          opacity: 0.6,
        }}
      />
      <Text style={styles.text}>{total}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  currentText: {
    color: 'rgba(255, 255, 255, 1)',
    fontVariant: ['tabular-nums'],
  },
  text: {
    color: 'white',
  },
})

export default Pagination
