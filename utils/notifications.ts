import * as Notifications from 'expo-notifications'
import type { PermissionStatus } from 'expo-notifications'
import { Linking, ToastAndroid } from 'react-native'

type SendNotificationFC = (
  title: string,
  body: string,
  trigger: Notifications.SchedulableNotificationTriggerInput,
) => Promise<string>

const DEFAULT_NOTIFICATIONS_TRIGGER: Notifications.SchedulableNotificationTriggerInput =
  {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date: new Date(),
  }

let openSettingsTimeout: null | NodeJS.Timeout | number = null

export async function getNotificationsPermissions(): Promise<{
  status: PermissionStatus
  canAskAgain: boolean
  granted: boolean
}> {
  if (openSettingsTimeout) clearTimeout(openSettingsTimeout)

  const { status, canAskAgain, granted } =
    await Notifications.getPermissionsAsync()

  if (granted) {
    return { status, canAskAgain, granted }
  }

  if (!granted && canAskAgain) {
    const permissionResponse = await Notifications.requestPermissionsAsync()
    return permissionResponse
  }

  if (!granted && !canAskAgain) {
    ToastAndroid.show('Abriendo las configuraciones', ToastAndroid.SHORT)
    openSettingsTimeout = setTimeout(() => {
      Linking.openSettings()
    }, 2000)
  }

  return { status, canAskAgain, granted }
}

export const sendNotification: SendNotificationFC = async (
  title,
  body,
  trigger = DEFAULT_NOTIFICATIONS_TRIGGER,
) => {
  const { granted } = await getNotificationsPermissions()

  if (!granted) return ''

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger,
  })

  return notificationId
}

export async function removeNotification(notificationId: string) {
  await Notifications.cancelScheduledNotificationAsync(notificationId)
}
