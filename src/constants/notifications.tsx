import * as Notifications from 'expo-notifications'

export const DEFAULT_NOTIFICATIONS_TRIGGER: Omit<
	Notifications.SchedulableNotificationTriggerInput,
	'date'
> = {
	type: Notifications.SchedulableTriggerInputTypes.DATE
}
export const DEFAULT_NOTIFICATION_BODY =
	'Se ha cumplido el tiempo para completar tu tarea.'