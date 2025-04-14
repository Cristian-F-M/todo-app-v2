import Close from '@icons/Close'
import { Pressable, Text, TextInput, View } from 'react-native'
import { StyledPressable } from './StyledPressable'
import { useCallback, useEffect, useState } from 'react'
import { useTasks } from '@context/Tasks'
import type { ModalProps, NotificationTypes } from 'Modal'
import Bell from '@icons/Bell'
import { Switch } from 'react-native-gesture-handler'
import type { TimeValueType, DateTimeValueType } from 'types/TimePicker'
import { TimePicker } from './TimePicker'
import { DateTimePicker } from './DateTimePicker'
import { CheckboxNotificationGroup } from './CheckboxNotificationGroup'
import { getNotificationText, sumDate } from '@utils/DateTime'
import {
  getNotificationsPermissions,
  sendNotification,
} from '@utils/notifications'
import * as Notifications from 'expo-notifications'
import { useColorScheme } from 'nativewind'

export function ModalTask({
  openModal,
  closeModal,
  type,
  item,
  folderId,
  mode = 'CREATE',
  onSubmit,
  onCancel,
  onError,
}: ModalProps) {
  const [textInput, setTextInput] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({})
  const [isNotification, setIsNotification] = useState(false)
  const [notificationType, setNotificationType] =
    useState<NotificationTypes>('TIME')
  const { addTask, addFolder, editFolder, editTask } = useTasks()
  const [timeValue, setTimeValue] = useState<TimeValueType>({
    minutes: 0,
    hours: 0,
  })
  const [dateTimeValue, setDateTimeValue] = useState<DateTimeValueType>(
    new Date(),
  )
  const { colorScheme } = useColorScheme()

  const handleClickSubmit = () => {
    if (textInput.trim() === '') {
      setErrors(prev => ({ ...prev, textInput: 'El campo es requerido' }))
      return
    }

    if (type === 'FOLDER') {
      if (mode === 'CREATE') createFolder()
      if (mode === 'EDIT') updateFolder()
    }

    if (type === 'TASK') {
      if (mode === 'CREATE') createTask()
      if (mode === 'EDIT') updateTask()
    }
    if (onSubmit) onSubmit()
    closeModal()

    if (isNotification) {
      let date = dateTimeValue

      if (notificationType === 'TIME') date = sumDate(new Date(), timeValue)

      sendNotification(textInput, 'Se completo el timepo de la tarea', {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
      })
    }
  }

  useEffect(() => {
    setErrors(prev => ({ ...prev, textInput: null }))
  }, [])

  const handleClickChangeText = useCallback((text: string) => {
    setTextInput(text)
    setErrors(prev => ({ ...prev, textInput: null }))
  }, [])

  const createFolder = useCallback(() => {
    addFolder(textInput)
  }, [addFolder, textInput])

  const updateFolder = useCallback(() => {
    if (!item) return
    editFolder(item.id, textInput)
  }, [editFolder, textInput, item])

  const createTask = useCallback(() => {
    if (!folderId) return
    addTask(folderId, textInput)
  }, [addTask, textInput, folderId])

  const updateTask = useCallback(() => {
    if (!item) return
    editTask(item.id, textInput)
  }, [editTask, textInput, item])

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
    setIsNotification(previousState => !previousState)
  }

  const timeIsZero = timeValue.hours === 0 && timeValue.minutes === 0

  const notificationAtText = getNotificationText(
    notificationType,
    timeIsZero,
    timeValue,
    dateTimeValue,
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
