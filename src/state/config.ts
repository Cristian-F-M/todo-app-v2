import { create } from 'zustand'
import { type Configs, defaultConfigs, getAllConfigs } from '@/utils/settings'

interface ConfigState {
	configs: Configs
	setConfigs: (configs: Configs) => void
	load: () => Promise<void>
}

export const useConfig = create<ConfigState>((set) => ({
	configs: defaultConfigs,
	setConfigs: (configs) => set({ configs }),
	load: async () => {
		const configs = await getAllConfigs()
		set({ configs })
	}
}))