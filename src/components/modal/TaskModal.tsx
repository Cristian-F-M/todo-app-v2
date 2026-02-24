import { IconBell } from '@tabler/icons-react-native'
import { useColorScheme } from 'nativewind'
import { useCallback, useMemo, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import Animated, { LinearTransition } from 'react-native-reanimated'
import uuid from 'react-native-uuid'
import { twMerge } from 'tailwind-merge'
import { TimePicker } from '@/components/TimePicker/TimePicker'
import { useModal } from '@/state/modal'
import useTask from '@/state/Task'
import type { NotificationType } from '@/types/modal'
import type { TimeValueType } from '@/types/timePicker'
import { formatDateString, sumDate } from '@/utils/dateTime'
import { removeNotification, sendNotification } from '@/utils/notifications'
import { getThemeColor } from '@/utils/theme'
import { DateTimePicker } from '../DateTimePicker/DateTimePicker'
import { StyledPressable } from '../layout/StyledPressable'
import { CheckboxNotificationGroup } from '../notification/CheckboxNotificationGroup'

export function TaskModal() {
	const { colorScheme } = useColorScheme()
	const { item, closeModal, folderId } = useModal()
	const { update, create } = useTask()
	const [error, setError] = useState<string | null>(null)
	const [textInput, setTextInput] = useState<string>(item?.data.name || '')
	const [notificate, setNotificate] = useState(false)
	const [notificationType, setNotificationType] =
		useState<NotificationType>('TIME')
	const [timeValue, setTimeValue] = useState<TimeValueType>({
		hours: 0,
		minutes: 0
	})
	const [dateTimeValue, setDateTimeValue] = useState(new Date())

	const thereIsItem = !!item
	const modalTitle = thereIsItem ? 'Editar tarea' : 'Crear tarea'
	const pressableText = thereIsItem ? 'Guardar' : 'Agregar'

	const handleSubmit = useCallback(async () => {
		const date =
			notificationType === 'DATE_TIME'
				? dateTimeValue
				: sumDate(dateTimeValue, timeValue)

		let notificationId: string | null = null
		if (notificate)
			notificationId = await sendNotification({
				title: textInput,
				trigger: { date }
			})

		// TODO: Use zod
		if (textInput.trim() === '') {
			setError('El nombre de la carpeta no puede estar vacío')
			return
		}

		if (thereIsItem && item.type === 'TASK') {
			if (notificate) removeNotification(item.data.notificationId ?? '')

			update({ ...item.data, name: textInput, notificationId })
			closeModal('task')

			return
		}

		if (!folderId) return

		const newTask = {
			id: uuid.v4(),
			name: textInput,
			folderId,
			isCompleted: false,
			notificationId
		}

		create(newTask)

		closeModal('task')
	}, [
		thereIsItem,
		textInput,
		update,
		create,
		item,
		closeModal,
		folderId,
		notificate,
		dateTimeValue,
		notificationType,
		timeValue
	])

	const handleChangeNotificationType = useCallback((type: NotificationType) => {
		setTimeValue({ hours: 0, minutes: 0 })
		setDateTimeValue(new Date())
		setNotificationType(type)
	}, [])

	const handleSetNotificate = useCallback((active: boolean) => {
		setNotificate(active)
		if (!active) {
			setTimeValue({ hours: 0, minutes: 0 })
			setDateTimeValue(new Date())
			setNotificationType('TIME')
		}
	}, [])

	const notificationText = useMemo(() => {
		if (notificationType === 'TIME') {
			if (!timeValue.hours && !timeValue.minutes) return 'No te notificatemos.'
			const hoursText = timeValue.hours
				? `${timeValue.hours} hora(s)${timeValue.minutes ? ' y ' : ''}`
				: ''
			const minutesText = timeValue.minutes
				? `${timeValue.minutes} minuto(s).`
				: ''
			return `Te notificatemos en: ${hoursText}${minutesText}`
		}

		return `Te notificatemos el: ${formatDateString(dateTimeValue)}`
	}, [notificationType, timeValue, dateTimeValue])

	return (
		<View className="relative flex-1 mx-aito w-full px-4 py-6">
			{/* <header /> */}
			<View className="flex-row items-center justify-between relative">
				<Text
					className="text-start text-2xl font-semibold tracking-wider"
					style={{
						color: getThemeColor('text-primary')
					}}
				>
					{modalTitle}
				</Text>
			</View>
			{/* <main /> */}
			<View>
				{/* <input-container /> */}
				<View>
					<View
						className="mt-6 rounded-lg border"
						style={{
							backgroundColor: getThemeColor('surface-soft'),
							borderColor: getThemeColor('border')
						}}
					>
						{/* <View></View> */}
						<TextInput
							multiline={true}
							numberOfLines={6}
							textAlignVertical="top"
							value={textInput}
							className="px-3 min-h-12"
							style={{
								color: getThemeColor('text-primary')
							}}
							placeholderTextColor={getThemeColor('text-secondary')}
							placeholder="Nombre de la tarea"
							onChange={(e) => {
								setError(null)
								setTextInput(e.nativeEvent.text)
							}}
						/>
					</View>
					{/* <input-error /> */}
					<Text
						className={twMerge('mt-1 text-sm hidden', error && 'block')}
						style={{
							color: getThemeColor('danger')
						}}
					>
						{error}
					</Text>
				</View>

				{/* <notification-container> */}
				<Animated.View
					layout={LinearTransition.duration(200)}
					className={twMerge(
						'rounded-lg mt-4 overflow-hidden',
						notificate && 'pb-4'
					)}
					style={{
						backgroundColor: getThemeColor('surface'),
						borderColor: getThemeColor('border')
					}}
				>
					{/* <header /> */}
					<Pressable
						onPress={() => handleSetNotificate(!notificate)}
						className={twMerge(
							'flex flex-row gap-2 items-center justify-between px-2 py-0 w-full'
						)}
						style={{
							backgroundColor: notificate
								? getThemeColor('surface-soft')
								: 'transparent'
						}}
					>
						<View className="flex flex-row gap-2 items-center">
							<IconBell
								color={getThemeColor('text-muted')}
								width={18}
								height={18}
							/>
							<Text
								style={{
									color: getThemeColor('text-primary')
								}}
							>
								Notificar
							</Text>
						</View>
						<Switch
							trackColor={{
								false: getThemeColor('text-secondary'),
								true: getThemeColor('primary')
							}}
							thumbColor={getThemeColor('text-primary')}
							value={notificate}
							onValueChange={handleSetNotificate}
						/>
					</Pressable>

					{/* <main /> */}
					{notificate && (
						<View className="flex flex-row gap-x-4 mt-2 items-center justify-between rounded-lg px-3 py-1">
							<View
								className="h-full w-1 rounded"
								style={{
									backgroundColor: getThemeColor('primary')
								}}
							></View>
							<View className="w-full flex-col pl-4 py-3 flex-1">
								<CheckboxNotificationGroup
									notificationType={notificationType}
									onChange={handleChangeNotificationType}
								/>
								<View className="mt-4">
									{notificationType === 'TIME' && (
										<TimePicker value={timeValue} onChange={setTimeValue} />
									)}
									{notificationType === 'DATE_TIME' && (
										<DateTimePicker
											value={dateTimeValue}
											onValueChange={setDateTimeValue}
										/>
									)}
								</View>
								{/* <notificate-at-container> */}
								<View
									className="mt-6 w-full flex flex-row gap-x-2 items-center px-3 py-2 rounded"
									style={{
										backgroundColor: getThemeColor('surface-soft')
									}}
								>
									<IconBell
										color={getThemeColor('text-muted')}
										width={18}
										height={18}
									/>

									<Text
										className="text-sm mt-px flex-1"
										style={{
											color: getThemeColor('text-primary')
										}}
									>
										{notificationText}
									</Text>
								</View>
							</View>
						</View>
					)}
				</Animated.View>
				<View className="mt-2">
					<StyledPressable
						text={pressableText}
						pressableClassName="mt-3"
						onPress={handleSubmit}
					/>
				</View>
			</View>
		</View>
	)
}