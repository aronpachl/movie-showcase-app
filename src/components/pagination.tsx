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
        gap: 8,
      }}
    >
      <Animated.Text
        key={`current-${current}`}
        entering={FadeInUp}
        exiting={FadeOutDown}
        style={[styles.currentText]}
      >
        {current > 9 ? current : `0${current}`}
      </Animated.Text>
      <Text style={styles.text}>{total}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  currentText: {
    color: 'rgba(255, 255, 255, 1)',
    fontVariant: ['tabular-nums'],
    fontWeight: '700',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '700',
  },
})

export default Pagination
