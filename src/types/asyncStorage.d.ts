export type KeyItem = string
// biome-ignore lint/suspicious/noExplicitAny: It does not matter
export type ValueItem = string | number | Record<string, any> | any[] | boolean

export type RemoveItemProps = {
	name: KeyItem
}

export type GetItemProps = {
	name: KeyItem
}

export type SetItemProps = {
	name: KeyItem
	value: ValueItem
}