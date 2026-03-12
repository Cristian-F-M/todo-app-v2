import * as z from 'zod'

export const createThemeSchema = z.object({
	name: z.string().min(1, 'El nombre del tema no puede estar vacío'),
	variant: z.string().min(1, 'La variante del tema no puede estar vacía')
})