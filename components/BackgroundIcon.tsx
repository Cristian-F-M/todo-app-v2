import CMLogo from '@icons/CMLogo'
import { View } from 'react-native'

export function BackgroundIcon() {
  return (
    <View
      style={{ filter: 'blur(15px)' }}
      className="absolute bg-black w-full h-full flex items-center justify-center backdrop-blur-3xl blur-3xl"
    >
      <CMLogo
        width={300}
        height={300}
      />
    </View>
  )
}
