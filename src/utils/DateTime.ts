import type { TimeValueType } from 'TimePicker'
import type { TimeValues } from 'TimePicker'

const defaultDateTime = {
  year: '----',
  month: '--',
  day: '--',
  hour: '----',
  minute: '----',
  ampm: '--------',
}

export function getDateTime(date: Date | undefined | null): TimeValues {
  if (!date) return defaultDateTime
  const time = date.toLocaleTimeString('en-US', { hour12: true })
  const [day, month, year] = date.toLocaleDateString().split('/')
  const [hour, minute] = date.toLocaleTimeString().split(':')
  const ampm = time.includes('AM') || time.includes('PM') ? time.slice(-2) : ''

  const timeValues = {
    year,
    month: month.padStart(2, '0'),
    day: day.padStart(2, '0'),
    hour: hour.padStart(2, '0'),
    minute: minute.padStart(2, '0'),
    ampm,
  }

  return timeValues
}

export function joinDateTime({ date, time }: { date: Date; time: Date }): Date {
  const [dateString, timeString] = [date.toISOString(), time.toISOString()]

  const newDate = [dateString.split('T')[0], timeString.split('T')[1]]
  const finallyDate = new Date(newDate.join(' '))
  return new Date(finallyDate)
}

export const formatTimeString = (date: Date) => {
  const [hours, minutes] = [date.getHours(), date.getMinutes()]
  let timeString = ''
  if (hours > 0) {
    timeString += `${hours} hora${hours !== 1 ? 's' : ''}`
  }
  if (minutes > 0) {
    if (timeString) timeString += ' y '
    timeString += `${minutes} minuto${minutes !== 1 ? 's' : ''}`
  }
  return timeString || '0 minutos'
}

export const formatDateString = (date: Date) => {
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function sumDate(date: Date, { hours, minutes }: TimeValueType) {
  const newDate = new Date(date)

  if (typeof hours !== 'string' && hours)
    newDate.setHours(newDate.getHours() + hours)
  if (typeof minutes !== 'string' && minutes)
    newDate.setMinutes(newDate.getMinutes() + minutes)

  return newDate
}

export function getNotificationText(
  notificationType: string,
  timeIsZero: boolean,
  timeValue: TimeValueType,
  dateTimeValue: Date,
): string {
  if (notificationType === 'TIME') {
    if (timeIsZero) return 'No te notificaremos'

    const hoursText = timeValue.hours ? `${timeValue.hours} horas` : ''
    const minutesText = timeValue.minutes ? `${timeValue.minutes} minutos` : ''
    const timeText = [hoursText, minutesText].filter(Boolean).join(' y ')

    return `En ${timeText}`
  }

  return `El ${formatDateString(dateTimeValue)}`
}
/**
 *
 * @param one Date to use year/month/day
 * @param two Date to use hh:mm:ss
 * @returns new Date with dates merged
 */
export function mergeDates(one: Date, two: Date) {
  const date = new Date(one)
  const time = new Date(two)

  const mergedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    0,
  )

  return mergedDate
}
