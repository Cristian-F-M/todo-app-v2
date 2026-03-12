import { useCallback } from 'react'
import { Pressable } from 'react-native'
import type { BouncyCheckboxProps } from 'react-native-bouncy-checkbox'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { getThemeColor } from '@/utils/theme'
import { CheckboxIcon } from './CheckboxIcon'

interface CheckboxProps extends BouncyCheckboxProps {
	value: boolean
	onValueChange: (value: boolean) => void
	size?: number
}

export function Checkbox({
	value,
	size,
	onValueChange,
	...props
}: CheckboxProps) {
	const fillColor = getThemeColor('text-muted', 0.2)
	const unFillColor = getThemeColor('surface-soft')
	const defaultSize = size ?? 20
	const padding = 2
	const iconSize = defaultSize * 0.6

	const handleValueChange = useCallback(() => {
		onValueChange(!value)
	}, [onValueChange, value])

	return (
		<Pressable
			className="flex items-center justify-center"
			style={{ width: defaultSize + padding, height: defaultSize + padding }}
			onPress={handleValueChange}
		>
			<BouncyCheckbox
				style={{ width: defaultSize, height: defaultSize }}
				isChecked={value}
				onPress={handleValueChange}
				useBuiltInState={false}
				size={defaultSize}
				fillColor={fillColor}
				unFillColor={unFillColor}
				iconComponent={<CheckboxIcon size={iconSize} isChecked={value} />}
				{...props}
			/>
		</Pressable>
	)
}