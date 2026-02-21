import type { PermissionStatus } from 'expo-notifications'
import * as Notifications from 'expo-notifications'
import { Linking, ToastAndroid } from 'react-native'

type SendNotificationProps = {
	title: string
	body?: string
	trigger: Notifications.SchedulableNotificationTriggerInput
}

const DEFAULT_NOTIFICATIONS_TRIGGER: Notifications.SchedulableNotificationTriggerInput =
	{
		type: Notifications.SchedulableTriggerInputTypes.DATE,
		date: new Date()
	}
const DEFAULT_NOTIFICATION_BODY =
	'Se ha cumplido el tiempo para completar tu tarea.'

let openSettingsTimeout: null | NodeJS.Timeout | number = null

export async function getNotificationsPermissions(): Promise<{
	status: PermissionStatus
	canAskAgain: boolean
	granted: boolean
}> {
	if (openSettingsTimeout) clearTimeout(openSettingsTimeout)

	const { status, canAskAgain, granted } =
		await Notifications.getPermissionsAsync()

	if (granted) return { status, canAskAgain, granted }

	if (!granted && canAskAgain) return getNotificationsPermissions()

	if (!granted && !canAskAgain) {
		ToastAndroid.show('Abriendo las configuraciones', ToastAndroid.SHORT)
		openSettingsTimeout = setTimeout(() => {
			Linking.openSettings()
		}, 2000)
	}

	return { status, canAskAgain, granted }
}

export async function sendNotification({
	title,
	body = DEFAULT_NOTIFICATION_BODY,
	trigger = DEFAULT_NOTIFICATIONS_TRIGGER
}: SendNotificationProps) {
	trigger = { ...DEFAULT_NOTIFICATIONS_TRIGGER, ...trigger }

	const { granted } = await getNotificationsPermissions()

	if (!granted) return null

	const notificationId = await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body
		},
		trigger
	})

	return notificationId
}

export async function removeNotification(notificationId: string) {
	await Notifications.cancelScheduledNotificationAsync(notificationId)
}