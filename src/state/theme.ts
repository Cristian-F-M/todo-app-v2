import { colorScheme } from 'nativewind'
import { create } from 'zustand'
import type { ThemeString } from '@/types/theme'
import { getItem, saveItem } from '@/utils/asyncStorage'

interface ThemeStore {
	theme: ThemeString
	setTheme: (theme: ThemeString) => Promise<void>
	load: () => Promise<void>
}

export const useTheme = create<ThemeStore>((set) => ({
	theme: 'system',
	setTheme: async (theme) => {
		await saveItem({ name: 'colorScheme', value: theme })
		colorScheme.set(theme)
		set({ theme })
	},
	load: async () => {
		const theme =
			(await getItem<ThemeString>({ name: 'colorScheme' })) || 'system'
		set({ theme })
		colorScheme.set(theme)
	}
}))