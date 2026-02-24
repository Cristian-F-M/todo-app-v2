import { useCallback } from 'react'
import { Text, View } from 'react-native'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import type { NotificationType } from '@/types/modal'
import { getThemeColor } from '@/utils/theme'

interface CheckboxNotificationGroupProps {
	notificationType: NotificationType
	onChange: (notificationType: NotificationType) => void
}

export function CheckboxNotificationGroup({
	notificationType,
	onChange
}: CheckboxNotificationGroupProps) {
	const handleChangeNotificationType = useCallback(
		(type: NotificationType) => {
			if (type === notificationType) return

			onChange(type)
		},
		[notificationType, onChange]
	)

	const textColor = getThemeColor('text-primary')

	return (
		<View className="w-full flex-col gap-2">
			<View className="flex-row items-center gap-x-2 flex">
				<Checkbox
					value={notificationType === 'TIME'}
					onValueChange={() => handleChangeNotificationType('TIME')}
					disableText
				/>
				<Text
					className="text-lg"
					style={{ color: textColor }}
					onPress={() => {
						handleChangeNotificationType('TIME')
					}}
				>
					Notificar en:
				</Text>
			</View>
			<View className="flex-row items-center gap-x-2">
				<Checkbox
					value={notificationType === 'DATE_TIME'}
					onValueChange={() => handleChangeNotificationType('DATE_TIME')}
					disableText
				/>

				<Text
					className="text-lg"
					onPress={() => {
						handleChangeNotificationType('DATE_TIME')
					}}
					style={{ color: textColor }}
				>
					Notificar fecha y hora:
				</Text>
			</View>
		</View>
	)
}