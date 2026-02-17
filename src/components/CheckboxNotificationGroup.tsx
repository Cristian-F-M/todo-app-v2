import type { NotificationTypes } from 'Modal'
import { useCallback } from 'react'
import { Text, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { CheckboxIcon } from './CheckboxIcon'
import type { TimeValueType } from 'TimePicker'
import { useColorScheme } from 'nativewind'

export function CheckboxNotificationGroup({
  notificationType,
  setNotificationType,
  setDateTimeValue,
  setTimeValue,
}: {
  notificationType: NotificationTypes
  setNotificationType: React.Dispatch<React.SetStateAction<NotificationTypes>>
  setDateTimeValue: React.Dispatch<React.SetStateAction<Date>>
  setTimeValue: React.Dispatch<React.SetStateAction<TimeValueType>>
}) {
  const { colorScheme } = useColorScheme()
  const resetDateTimeValue = useCallback(() => {
    setDateTimeValue(new Date())
  }, [setDateTimeValue])

  const resetTimeValue = useCallback(() => {
    setTimeValue({ minutes: 0, hours: 0 })
  }, [setTimeValue])

  const handleChangeNotificationType = useCallback(
    (type: NotificationTypes) => {
      if (type === notificationType) return

      resetDateTimeValue()
      resetTimeValue()
      setNotificationType(type)
    },
    [notificationType, resetDateTimeValue, setNotificationType, resetTimeValue],
  )

  return (
    <View className="w-full flex-col gap-2">
      <View className="flex-row items-center gap-x-2 flex">
        <BouncyCheckbox
          isChecked={notificationType === 'TIME'}
          onPress={() => {
            handleChangeNotificationType('TIME')
          }}
          useBuiltInState={false}
          size={20}
          fillColor={colorScheme === 'dark' ? '#2563eb8f' : '#6b7280'}
          unFillColor={colorScheme === 'dark' ? '#172554' : '#d1d5db'}
          disableText
          iconComponent={
            <CheckboxIcon isChecked={notificationType === 'TIME'} />
          }
        />
        <Text
          className="dark:text-white"
          onPress={() => {
            handleChangeNotificationType('TIME')
          }}
        >
          Notificar en:
        </Text>
      </View>
      <View className="flex-row items-center gap-x-2">
        <BouncyCheckbox
          isChecked={notificationType === 'DATE_TIME'}
          onPress={() => {
            handleChangeNotificationType('DATE_TIME')
          }}
          useBuiltInState={false}
          size={20}
          fillColor="#2563eb8f"
          unFillColor="#172554"
          disableText
          iconComponent={
            <CheckboxIcon isChecked={notificationType === 'DATE_TIME'} />
          }
        />
        <Text
          className="dark:text-white"
          onPress={() => {
            handleChangeNotificationType('DATE_TIME')
          }}
        >
          Notificar fecha y hora:
        </Text>
      </View>
    </View>
  )
}
