export function mergeObjects<T extends Record<string, unknown>>(
	defaults: Record<string, unknown>,
	toMerge: Record<string, unknown>
) {
	const fullDataEntries = [Object.entries(defaults), Object.entries(toMerge)]
		.flat()
		.filter(([, v]) => v != null)

	return Object.fromEntries(fullDataEntries) as T
}