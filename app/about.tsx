import {
	IconBugFilled,
	IconCopy,
	IconMessageReportFilled
} from '@tabler/icons-react-native'
import * as Clipboard from 'expo-clipboard'
import * as Linking from 'expo-linking'
import { Stack } from 'expo-router'
import type { ExtendedStackNavigationOptions } from 'expo-router/build/layouts/StackClient'
import { useCallback } from 'react'
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	ToastAndroid,
	View
} from 'react-native'
import { SocialNetworks } from '@/components/about/social-networks/SocialNetworks'
import { Screen } from '@/components/layout/Screen'
import { APP_INFO } from '@/constants/about'
import CMLogo from '@/icons/CMLogo'
import { getThemeColor, useThemeStyles } from '@/utils/theme'
import packageJson from '../package.json'

export default function AboutPage() {
	const screenOptions = useThemeStyles<ExtendedStackNavigationOptions>(() => ({
		headerShown: true,
		headerTitle: '',
		headerTitleAlign: 'center',
		headerStyle: {
			backgroundColor: getThemeColor('surface')
		},
		headerTintColor: getThemeColor('text-primary')
	}))

	const handleCopySystemInfo = useCallback(async () => {
		const systemInfo = APP_INFO.map(([key, value]) => `${key}: ${value}`).join(
			'\n'
		)
		await Clipboard.setStringAsync(systemInfo)
		ToastAndroid.show('Información copiada', ToastAndroid.SHORT)
	}, [])

	const handleSendFeedback = useCallback(() => {
		const deviceDetailsText = `Device's Detail:
		\r${APP_INFO.map(([key, value]) => `${key}: ${value}`).join('\n')}
		`

		const subject = `Give feedback for app ${packageJson.name}`
		const body = `Hola ${packageJson.author.name}

		\r${deviceDetailsText}

		\rComentarios:
		`
		const url = `mailto:${packageJson.author.email}?subject=${subject}&body=${body}`
		Linking.openURL(url)
	}, [])

	const handleSendBugReport = useCallback(() => {
		const deviceDetailsText = `Device's Detail:
		\r${APP_INFO.map(([key, value]) => `${key}: ${value}`).join('\n')}
		`

		const subject = `Bug Report for app ${packageJson.name}`
		const body = `Hola ${packageJson.author.name}

		\r${deviceDetailsText}

		\rReporte:
		`

		const url = `mailto:${packageJson.author.email}?subject=${subject}&body=${body}`
		Linking.openURL(url)
	}, [])

	return (
		<Screen className="w-[90%] mx-auto">
			<ScrollView showsVerticalScrollIndicator={false} className="py-4">
				<Stack.Screen options={screenOptions} />
				{/* <header /> */}
				<View className="items-center">
					<View
						className="rounded-full p-4"
						style={{
							backgroundColor: getThemeColor('primary', 0.4)
						}}
					>
						<CMLogo
							width={40}
							height={40}
							color={getThemeColor('text-primary')}
						/>
					</View>
					{/* <version /> */}
					<View className="mt-1">
						<Text
							style={{
								color: getThemeColor('text-secondary')
							}}
						>
							versión {packageJson.version}
						</Text>
					</View>
					{/* <find-new-version /> */}
				</View>

				{/* <social-networks /> */}
				<SocialNetworks />

				{/* <rate-app /> */}
				{/* work in progress |> App is not in play store */}

				<View className="flex-col gap-y-5 mt-10">
					{/* <feedback /> */}
					<Pressable style={styles.card} onPress={handleSendFeedback}>
						<View>
							<IconMessageReportFilled
								color={getThemeColor('text-primary')}
								size={24}
							/>
						</View>
						<View style={styles.cardTexts}>
							<Text className="font-semibold" style={styles.cardText}>
								Comentarios
							</Text>
							<Text
								style={{
									color: getThemeColor('text-muted')
								}}
							>
								Comparte sugerencias o comentarios con nosotros.
							</Text>
						</View>
					</Pressable>

					{/* <bug-report /> */}
					<Pressable style={styles.card} onPress={handleSendBugReport}>
						<View>
							<IconBugFilled color={getThemeColor('text-primary')} size={24} />
						</View>
						<View style={styles.cardTexts}>
							<Text className="font-semibold" style={styles.cardText}>
								Reportar un error
							</Text>
							<Text
								style={{
									color: getThemeColor('text-muted')
								}}
							>
								Ayúdanos a mejorar la aplicación.
							</Text>
						</View>
					</Pressable>
				</View>

				{/* <app-information /> */}
				<View className="mt-6">
					<View className="flex-row items-center justify-between">
						<Text
							style={{
								color: getThemeColor('text-secondary')
							}}
						>
							Información de la aplicación
						</Text>
						<Pressable
							onPress={handleCopySystemInfo}
							className="active:bg-surface-soft p-1 rounded"
						>
							<IconCopy color={getThemeColor('text-primary')} size={20} />
						</Pressable>
					</View>

					<View
						className="mt-2 mb-10"
						style={[styles.card, { flexDirection: 'column' }]}
					>
						{APP_INFO.map(([key, value], index) => (
							<View key={key}>
								<View className="flex-row items-center justify-between">
									<Text
										style={{
											color: getThemeColor('text-secondary')
										}}
									>
										{key}
									</Text>
									<Text
										style={{
											color: getThemeColor('text-primary')
										}}
									>
										{value}
									</Text>
								</View>
								{index < APP_INFO.length - 1 && (
									<View
										className="h-[1px] my-2"
										style={{
											backgroundColor: getThemeColor('border')
										}}
									/>
								)}
							</View>
						))}
					</View>
				</View>
			</ScrollView>
		</Screen>
	)
}

const styles = StyleSheet.create({
	card: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: getThemeColor('border'),
		alignSelf: 'center',
		borderRadius: 8,
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		gap: 10
	},
	cardText: {
		color: getThemeColor('text-primary')
	},
	cardTexts: {
		flex: 1
	}
})