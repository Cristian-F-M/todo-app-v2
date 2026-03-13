import { IconChevronRight } from '@tabler/icons-react-native'
import { Link } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { Pressable } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import type { SvgProps } from 'react-native-svg'
import { SOCIAL_MEDIA } from '@/constants/socialMedia'
import { getThemeColor } from '@/utils/theme'

export function SocialNetworks() {
	const [isSocialMediaOpen, setIsSocialMediaOpen] = useState(false)
	const socialMediaMaxItems = 3
	const socialMediaNetWorks = useMemo(() => {
		return SOCIAL_MEDIA.slice(
			0,
			isSocialMediaOpen ? SOCIAL_MEDIA.length : socialMediaMaxItems
		)
	}, [isSocialMediaOpen])

	return (
		<Animated.View
			layout={LinearTransition.duration(200)}
			className="flex-row items-center mx-auto"
			style={{
				maxWidth: '80%'
			}}
		>
			<Animated.View
				layout={LinearTransition.duration(200)}
				className="flex-row gap-x-1 items-center mx-auto overflow-hidden"
			>
				{socialMediaNetWorks.map((media) => {
					let Icon = media.icon() as React.ReactElement<SvgProps>

					if (React.isValidElement(Icon)) {
						Icon = React.cloneElement(Icon, {
							color: getThemeColor('text-secondary'),
							width: 20,
							height: 20
						})
					}

					return (
						<Link href={media.url} asChild key={media.id}>
							<Pressable className="active:bg-surface-soft p-1 rounded">
								{Icon && Icon}
							</Pressable>
						</Link>
					)
				})}
			</Animated.View>
			{!isSocialMediaOpen && (
				<Pressable
					className="p-1 rounded active:bg-surface-soft"
					onPress={() => setIsSocialMediaOpen((prev) => !prev)}
				>
					<IconChevronRight size={18} color={getThemeColor('text-muted')} />
				</Pressable>
			)}
		</Animated.View>
	)
}