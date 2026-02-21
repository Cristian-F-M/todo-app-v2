import type * as Notifications from 'expo-notifications'
import type { PermissionStatus } from 'expo-notifications'

export type NotificationTriggerInput =
	Notifications.SchedulableNotificationTriggerInput

export type DefaultNotificationTrigger = typeof DEFAULT_NOTIFICATIONS_TRIGGER
export type trigger = Omit<
	NotificationTriggerInput,
	keyof DefaultNotificationTrigger
>

export type SendNotificationProps = {
	title: string
	body?: string
	trigger: trigger
}

export type GetNotificationsPermissionsReturnType = {
	status: PermissionStatus
	canAskAgain: boolean
	granted: boolean
}