import { IconX } from '@tabler/icons-react-native'
import { BlurView } from 'expo-blur'
import { useState } from 'react'
import {
	Dimensions,
	FlatList,
	Modal,
	Pressable,
	Text,
	View
} from 'react-native'
import { Portal } from 'react-native-portalize'
import uuid from 'react-native-uuid'
import { ContextMenu } from '@/components/context-menu/ContextMenu'
import { ColorSquare } from '@/components/createTheme/ColorSquare'
import { ThemeOverview } from '@/components/theme/ThemeOverview'
import { useTheme } from '@/state/theme'
import type { ConfigRowModalWithListProps } from '@/types/config'
import type { ContextMenuItemData } from '@/types/contextMenu'
import type { ThemeParsedObject } from '@/types/theme'
import { RGBA, removeTheme, useThemeStyles } from '@/utils/theme'
import { THEME_OVERVIEW_MENU_ACTIONS } from './contextMenu'

export const useConfigModal = () => {
	const { themes, theme, setTheme } = useTheme()
	const themeKeys = Object.values(themes).map(() => uuid.v4())
	const [themeToSee, setThemeToSee] = useState<string | null>(null)
	const themeStyles = useThemeStyles()
	const { height: screenHeight } = Dimensions.get('window')

	const ConfigModalConfig = {
		flatList: true,
		flatListProps: {
			data: Object.values(themes),
			renderItem: ({ item }: { item: ThemeParsedObject }) => {
				const isSelected = item.id === theme
				const themePreview = themeToSee ? themes[themeToSee] : null

				const handleSetTheme = (contextMenuItem: ContextMenuItemData) => {
					if (contextMenuItem.id === 'see-theme') {
						setThemeToSee(item.id)
					}
					if (contextMenuItem.id === 'select-theme') setTheme(item.id)
					if (contextMenuItem.id === 'delete-theme') {
						removeTheme(item.id)
					}
				}
				let actions = THEME_OVERVIEW_MENU_ACTIONS.filter(
					({ id }) => id !== 'edit-theme'
				)

				if (item.scope === 'system')
					actions = actions.filter(
						({ id }) => !['delete-theme', 'edit-theme'].includes(id)
					)

				if (isSelected)
					actions = actions.filter(
						({ id }) => id !== 'select-theme' && id !== 'delete-theme'
					)

				return (
					<>
						<Portal>
							<Modal
								visible={themeToSee === item.id}
								onDismiss={() => setThemeToSee(null)}
								// transparent
								backdropColor={themeStyles.overlay(0.6)}
								animationType="fade"
								onMagicTap={() => setThemeToSee(null)}
							>
								<Pressable
									onPress={() => setThemeToSee(null)}
									className="absolute inset-0 w-full h-full"
								></Pressable>
								<View className="w-full h-full items-center justify-center">
									<BlurView
										intensity={15}
										tint="default"
										experimentalBlurMethod="dimezisBlurView"
										className="mx-auto rounded-2xl overflow-hidden"
										style={{
											width: '90%',
											maxHeight: screenHeight * 0.6,

											// fondo tipo glass
											backgroundColor: themeStyles.surface(0.8),

											// borde suave tipo web
											borderWidth: 1,
											borderColor: themeStyles.border(),

											// sombras suaves
											shadowColor: '#000',
											shadowOpacity: 0.15,
											shadowRadius: 20,
											shadowOffset: { width: 0, height: 10 },

											// android elevation
											elevation: 8
										}}
									>
										<View
											className="py-5 px-5"
											style={{
												marginBottom: 20
											}}
										>
											<View className="flex-row items-center justify-between mb-4 w-full">
												<View>
													<Text
														className="text-2xl font-bold"
														style={{
															color: themeStyles.textPrimary()
														}}
													>
														{item.name}
													</Text>
													<Text
														className="text-sm"
														style={{
															color: themeStyles.textMuted()
														}}
													>
														{item.variant}
													</Text>
												</View>
												<Pressable
													className="rounded-full p-1 self-start mb-auto"
													style={{
														alignSelf: 'flex-start'
													}}
													onPress={() => setThemeToSee(null)}
												>
													<IconX size={20} color={themeStyles.textPrimary()} />
												</Pressable>
											</View>

											{themePreview && (
												<FlatList
													className="mt-1"
													contentContainerStyle={{
														marginRight: 10,
														paddingVertical: 20
													}}
													data={Object.entries(themePreview.colors)}
													renderItem={({ item: [key, color] }) => (
														<View className="flex-row items-center justify-between">
															<Text
																className="text-md font-bold"
																style={{
																	color: themeStyles.textPrimary()
																}}
															>
																{key}
															</Text>
															<ColorSquare
																value={RGBA(color)}
																className="rounded-md"
															/>
														</View>
													)}
													ItemSeparatorComponent={() => (
														<View
															className="w-full my-2"
															style={{
																height: 1,
																backgroundColor: themeStyles.textMuted()
															}}
														/>
													)}
												/>
											)}
										</View>
									</BlurView>
								</View>
							</Modal>
						</Portal>
						<ContextMenu
							items={actions}
							showOnLongPress
							onItemPress={handleSetTheme}
							title={item.name}
						>
							<ThemeOverview
								theme={item}
								themeKey={item.id}
								isSelected={isSelected}
							/>
						</ContextMenu>
					</>
				)
			},
			keyExtractor: (_: unknown, index: number) => themeKeys[index],

			initialNumToRender: 6,
			maxToRenderPerBatch: 4,
			windowSize: 3,
			removeClippedSubviews: true,
			contentContainerStyle: { paddingBottom: 20 },
			extraData: themes
		}
	} satisfies ConfigRowModalWithListProps

	return { config: ConfigModalConfig }
}