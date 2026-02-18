import * as Notifications from 'expo-notifications'
import { useColorScheme } from 'nativewind'
import { useCallback, useEffect, useState } from 'react'
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import uuid from 'react-native-uuid'
import { CheckboxNotificationGroup } from '@/components/CheckboxNotificationGroup'
import { DateTimePicker } from '@/components/DateTimePicker'
import { TimePicker } from '@/components/TimePicker'
import Bell from '@/icons/Bell'
import Close from '@/icons/Close'
import useFolder from '@/state/Folder'
import useTask from '@/state/Task'
import type { Folder } from '@/types/Folder'
import type { ModalProps, NotificationTypes } from '@/types/Modal'
import type { Task } from '@/types/Task'
import type { DateTimeValueType, TimeValueType } from '@/types/TimePicker'
import { getNotificationText } from '@/utils/DateTime'
import {
	getNotificationsPermissions,
	sendNotification
} from '@/utils/notifications'
import { StyledPressable } from './StyledPressable'

export function ModalTask({
	openModal,
	closeModal,
	type,
	item,
	folderId,
	mode = 'CREATE',
	onSubmit,
	onCancel,
	onError
}: ModalProps) {
	const [textInput, setTextInput] = useState('')
	const [errors, setErrors] = useState<{ [key: string]: string | null }>({})
	const [isNotification, setIsNotification] = useState(false)
	const [notificationType, setNotificationType] =
		useState<NotificationTypes>('TIME')
	// const { addTask, addFolder, editFolder, editTask } = useTasks()
	const [timeValue, setTimeValue] = useState<TimeValueType>({
		minutes: 0,
		hours: 0
	})
	const [dateTimeValue, setDateTimeValue] = useState<DateTimeValueType>(
		new Date()
	)
	const { colorScheme } = useColorScheme()
	const folderState = useFolder()
	const taskState = useTask()

	const handleClickSubmit = async () => {
		if (textInput.trim() === '') {
			setErrors((prev) => ({ ...prev, textInput: 'El campo es requerido' }))
			return
		}

		let notificationId = null

		if (isNotification) {
			let date = dateTimeValue

			if (notificationType === 'TIME') {
				const newDate = new Date()
				newDate.setHours(newDate.getHours() + Number(timeValue.hours))
				newDate.setMinutes(newDate.getMinutes() + Number(timeValue.minutes))
				newDate.setSeconds(0)
				date = newDate
			}

			notificationId = await sendNotification(
				textInput,
				'Se completo el timepo de la tarea',
				{
					type: Notifications.SchedulableTriggerInputTypes.DATE,
					date: new Date(date)
				}
			)
		}

		if (type === 'FOLDER') {
			if (mode === 'CREATE') createFolder()
			if (mode === 'EDIT') updateFolder()
		}

		if (type === 'TASK') {
			if (mode === 'CREATE') createTask(notificationId)
			if (mode === 'EDIT') updateTask()
		}
		if (onSubmit) onSubmit()
		closeModal()
	}

	useEffect(() => {
		setErrors((prev) => ({ ...prev, textInput: null }))
	}, [])

	const handleClickChangeText = useCallback((text: string) => {
		setTextInput(text)
		setErrors((prev) => ({ ...prev, textInput: null }))
	}, [])

	const createFolder = useCallback(() => {
		folderState.create({
			id: uuid.v4(),
			name: textInput,
			taskCount: 0
		})
	}, [folderState, textInput])

	const updateFolder = useCallback(() => {
		if (!item) return
		const folder = item as unknown as Folder

		folderState.update({
			...folder,
			name: textInput
		})
	}, [folderState, textInput, item])

	const createTask = useCallback(
		(notificationId: string | null) => {
			if (!folderId) return
			taskState.create({
				id: uuid.v4(),
				name: textInput,
				folderId,
				notificationId
			})
		},
		[taskState, textInput, folderId]
	)

	const updateTask = useCallback(() => {
		if (!item) return
		const task = item as unknown as Task

		taskState.update({
			...task,
			name: textInput
		})
	}, [taskState, textInput, item])

	useEffect(() => {
		if (mode === 'EDIT' && item) {
			setTextInput(item.name)
		}
	}, [item, mode])

	const modalMode = mode === 'CREATE' ? 'Agregar' : 'Editar'
	const modalType = type === 'FOLDER' ? 'carpeta' : 'tarea'
	const textPlaceholder =
		type === 'FOLDER' ? 'Compras, tareas, ...' : 'Guantes, warp, ...'

	const modalTitle = `${modalMode} ${modalType}`
	const pressableText = mode === 'CREATE' ? 'Agregar' : 'Guardar'

	const toggleSwitch = async () => {
		if (!isNotification) {
			const { granted } = await getNotificationsPermissions()
			if (!granted) return
		}
		setIsNotification((previousState) => !previousState)
	}

	const timeIsZero = timeValue.hours === 0 && timeValue.minutes === 0

	const notificationAtText = getNotificationText(
		notificationType,
		timeIsZero,
		timeValue,
		dateTimeValue
	)

	return (
		<View className="relative flex-1 mx-auto w-full px-4 py-6">
			<View className="flex-row items-center justify-between relative">
				<Text className="text-start text-3xl dark:text-white text-gray-800 font-semibold tracking-wider">
					{modalTitle}
				</Text>
				<View className="absolute right-0">
					<Pressable
						className="active:dark:bg-blue-900 active:bg-blue-400 p-1 rounded-lg"
						onPress={closeModal}
					>
						<Close
							stroke={colorScheme === 'dark' ? '#7e8aae' : '#1f2937'}
							width={24}
							height={24}
						/>
					</Pressable>
				</View>
			</View>
			<View className="dark:bg-blue-900/30 bg-blue-200/40 border-blue-800 mt-6 rounded-lg border">
				<TextInput
					className="dark:text-white text-gray-800 px-3 h-14"
					placeholderTextColor={colorScheme === 'dark' ? '#99a1af' : '#6b7280'}
					placeholder={textPlaceholder}
					onChangeText={handleClickChangeText}
					value={textInput}
				/>
			</View>
			<Text
				className="text-red-500 mt-1"
				style={{ opacity: errors.textInput ? 1 : 0 }}
			>
				{errors.textInput}
			</Text>

			<View className="dark:bg-blue-500/20 bg-blue-300/60 rounded-lg mt-2">
				{type === 'TASK' && (
					<View className="flex-row items-center justify-between rounded-lg px-3 py-1">
						<View className="flex-row items-center gap-x-2 h-14 color-blue-600">
							<Bell
								color={colorScheme === 'dark' ? '#60a5fa' : '#2563eb'}
								width={24}
								height={24}
							/>
							<Text className="dark:text-white text-base">Notificar</Text>
						</View>
						<Switch
							trackColor={{ false: '#767577', true: '#2563eb' }}
							thumbColor={'#fff'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isNotification}
						/>
					</View>
				)}

				{isNotification && (
					<View>
						<View className="flex-row items-center justify-between rounded-lg px-3 py-1">
							<View className="w-1 h-full dark:bg-blue-500/70 bg-blue-700/70 rounded"></View>
							<View className="w-full flex-col pl-5 py-3">
								<CheckboxNotificationGroup
									notificationType={notificationType}
									setNotificationType={setNotificationType}
									setDateTimeValue={setDateTimeValue}
									setTimeValue={setTimeValue}
								/>

								<View className="mt-4">
									{notificationType === 'TIME' && (
										<TimePicker
											timeValue={timeValue}
											setTimeValue={setTimeValue}
										/>
									)}
									{notificationType === 'DATE_TIME' && (
										<DateTimePicker
											dateTime={dateTimeValue}
											setDate={setDateTimeValue}
										/>
									)}
								</View>

								<View className="mt-6 dark:bg-resalt/20 bg-blue-500/50 px-2 py-2 rounded-md flex-row gap-x-2 items-center">
									<View>
										<Bell
											color={colorScheme === 'dark' ? '#60a5fa' : '#2563eb'}
											width={17}
											height={17}
										/>
									</View>
									<View className="flex-col gap-x-1">
										{!timeIsZero ||
											(notificationType === 'DATE_TIME' && (
												<Text className="text-gray-300">
													Te notificaremos:{' '}
												</Text>
											))}
										<Text className="dark:text-white text-base">
											{notificationAtText}
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				)}
			</View>

			<View>
				<StyledPressable
					text={pressableText}
					pressableClassName="mt-3"
					onPress={handleClickSubmit}
				/>
			</View>
		</View>
	)
}