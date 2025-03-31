import { View } from 'react-native'

export function CheckboxIcon({ isChecked }: { isChecked: boolean }) {
  return (
    <View
      className={`size-10/12 dark:bg-resalt bg-blue-600 rounded-full ${isChecked ? 'opacity-100' : 'opacity-0'}`}
    ></View>
  )
}
