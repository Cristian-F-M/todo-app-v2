import * as Notifications from 'expo-notifications'
import { Linking, ToastAndroid } from 'react-native'
import {
	DEFAULT_NOTIFICATION_BODY,
	DEFAULT_NOTIFICATIONS_TRIGGER
} from '@/constants/notifications'
import type {
	GetNotificationsPermissionsReturnType,
	NotificationTriggerInput,
	SendNotificationProps
} from '@/types/notification'
import { mergeObjects } from '.'

let openSettingsTimeout: null | NodeJS.Timeout | number = null

export async function getNotificationsPermissions(): Promise<GetNotificationsPermissionsReturnType> {
	if (openSettingsTimeout) clearTimeout(openSettingsTimeout)

	const { status, canAskAgain, granted } =
		await Notifications.getPermissionsAsync()

	if (granted) return { status, canAskAgain, granted }

	if (!granted && canAskAgain)
		return await Notifications.requestPermissionsAsync()

	if (!granted && !canAskAgain) {
		ToastAndroid.show(
			'Debes otorgar el permiso de notificaciones',
			ToastAndroid.SHORT
		)
		openSettingsTimeout = setTimeout(async () => {
			await Linking.openSettings()
		}, 2300)
	}

	return { status, canAskAgain, granted }
}

export async function sendNotification({
	title,
	body = DEFAULT_NOTIFICATION_BODY,
	trigger = {}
}: SendNotificationProps) {
	const fullTrigger = mergeObjects<NotificationTriggerInput>(
		DEFAULT_NOTIFICATIONS_TRIGGER,
		trigger
	)

	const { granted } = await getNotificationsPermissions()

	if (!granted) return null

	const notificationId = await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body
		},
		trigger: fullTrigger
	})

	return notificationId
}

export async function removeNotification(notificationId: string) {
	await Notifications.cancelScheduledNotificationAsync(notificationId)
}