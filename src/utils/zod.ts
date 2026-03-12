import type { ZodType } from 'zod'

interface Message {
	origin: string
	code: string
	inclusive: boolean
	path: string[]
	message: string
}

export function zodParse<T = unknown>(
	schema: ZodType,
	data: T
):
	| { success: true; data: T }
	| { success: false; errors: Record<string, string> } {
	const result = schema.safeParse(data)

	if (!result.success) {
		const errors = JSON.parse(result.error.message) as Message[]
		const parsedErrors = Object.fromEntries(
			errors.map(({ path, message }) => [path[0], message])
		)

		return { success: false, errors: parsedErrors }
	}

	return { success: true, data: result.data as T }
}