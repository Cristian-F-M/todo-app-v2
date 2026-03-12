import { FlatList, View } from 'react-native'
import { FolderItem } from '@/components/folder/FolderItem'
import { NoFolders } from '@/components/folder/NoFolders'
import { BackgroundIcon } from '@/components/layout/BackgroundIcon'
import { Header } from '@/components/layout/Header'
import { Screen } from '@/components/layout/Screen'
import useFolder from '@/state/Folder'

export default function Index() {
	const { folders } = useFolder()

	const thereIsFolders = folders.length > 0

	return (
		<Screen safeArea={true}>
			{thereIsFolders && <BackgroundIcon />}
			<Header />

			{!thereIsFolders && <NoFolders />}

			<View className="mt-10 items-center justify-center w-11/12 mx-auto flex-1 mb-6">
				<FlatList
					className="w-full gap-y-2"
					data={folders}
					renderItem={({ item }) => <FolderItem folder={item} />}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</Screen>
	)
}