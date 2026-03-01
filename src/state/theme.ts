import { create } from 'zustand'
import { THEMES_OBJ } from '@/constants/theme'
import type { Theme, ThemeParsedObject } from '@/types/theme'
import { getItem, saveItem } from '@/utils/asyncStorage'

interface ThemeStore {
	theme: Theme
	themes: Record<string, ThemeParsedObject>
	setTheme: (theme: Theme) => Promise<void>
	load: () => Promise<void>
	setThemes: (themes: Record<string, ThemeParsedObject>) => void
}

export const useTheme = create<ThemeStore>((set) => ({
	theme: 'dark',
	themes: THEMES_OBJ,
	setTheme: async (theme) => {
		await saveItem({ name: 'theme', value: theme })
		set({ theme })
	},
	setThemes: (themes) => {
		console.log('themes')
		set({ themes })
	},
	load: async () => {
		const themes = await getItem<Record<string, ThemeParsedObject>>({
			name: 'themes'
		})

		const theme = (await getItem<Theme>({ name: 'theme' })) || 'dark'
		set({ theme, themes: Object.assign({}, THEMES_OBJ, themes ?? {}) })
	}
}))