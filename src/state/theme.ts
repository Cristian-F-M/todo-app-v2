import { create } from 'zustand'
import { THEMES_OBJ } from '@/constants/theme'
import type { Theme, ThemeObject } from '@/types/theme'
import { getItem, saveItem } from '@/utils/asyncStorage'

interface ThemeStore {
	theme: Theme
	themes: Record<string, ThemeObject>
	setTheme: (theme: Theme) => Promise<void>
	load: () => Promise<void>
}

export const useTheme = create<ThemeStore>((set) => ({
	theme: 'dark',
	themes: THEMES_OBJ,
	setTheme: async (theme) => {
		await saveItem({ name: 'theme', value: theme })
		set({ theme })
	},
	load: async () => {
		const themes = await getItem<Record<string, ThemeObject>>({
			name: 'themes'
		})

		const theme = (await getItem<Theme>({ name: 'theme' })) || 'dark'
		set({ theme, themes: Object.assign({}, THEMES_OBJ, themes ?? {}) })
	}
}))