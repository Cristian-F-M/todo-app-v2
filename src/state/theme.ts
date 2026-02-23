import { create } from 'zustand'
import type { Theme } from '@/types/theme'
import { getItem, saveItem } from '@/utils/asyncStorage'

interface ThemeStore {
	theme: Theme
	setTheme: (theme: Theme) => Promise<void>
	load: () => Promise<void>
}

export const useTheme = create<ThemeStore>((set) => ({
	theme: 'dark',
	setTheme: async (theme) => {
		await saveItem({ name: 'theme', value: theme })
		set({ theme })
	},
	load: async () => {
		const theme = (await getItem<Theme>({ name: 'theme' })) || 'dark'
		set({ theme })
	}
}))