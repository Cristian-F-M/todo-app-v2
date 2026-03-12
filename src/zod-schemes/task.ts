import * as z from 'zod'

export const createTaskSchema = z.object({
	title: z.string().min(1, 'El nombre de la tarea no puede estar vacío')
})