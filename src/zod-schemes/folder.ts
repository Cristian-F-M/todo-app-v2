import * as z from 'zod'

export const createFolderSchema = z.object({
	title: z.string().min(1, 'El nombre de la carpeta no puede estar vacío')
})