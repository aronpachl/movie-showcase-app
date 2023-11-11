import { ActivityIndicator } from 'react-native'

function Loader() {
  return (
    <ActivityIndicator
      size={'large'}
      animating={true}
      style={{
        marginTop: 80,
        position: 'absolute',
        alignSelf: 'center',
      }}
      color={'white'}
    />
  )
}

export default Loader
