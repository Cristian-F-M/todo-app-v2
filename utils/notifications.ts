import * as Notifications from 'expo-notifications'
import type { PermissionStatus } from 'expo-notifications'
import { Linking } from 'react-native'

type SendNotificationFC = (
  title: string,
  body: string,
  trigger: Notifications.SchedulableNotificationTriggerInput,
) => void

const DEFAULT_NOTIFICATIONS_TRIGGER: Notifications.SchedulableNotificationTriggerInput =
  {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date: new Date(),
  }

export async function getNotificationsPermissions(): Promise<{
  status: PermissionStatus
  canAskAgain: boolean
  granted: boolean
}> {
  const { status, canAskAgain, granted } =
    await Notifications.getPermissionsAsync()

  if (granted) {
    return { status, canAskAgain, granted }
  }

  if (!granted && canAskAgain) {
    Notifications.requestPermissionsAsync()
    return getNotificationsPermissions()
  }

  if (!granted && !canAskAgain) {
    Linking.openSettings()
  }

  return { status, canAskAgain, granted }
}

export const sendNotification: SendNotificationFC = async (
  title,
  body,
  trigger = DEFAULT_NOTIFICATIONS_TRIGGER,
) => {
  const { granted } = await getNotificationsPermissions()

  if (!granted) return

  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger,
  })
}
