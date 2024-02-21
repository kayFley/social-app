import { z } from 'zod'

export const SignupValidation = z.object({
	name: z.string().min(2, { message: 'The name is too short' }),
	username: z
		.string()
		.min(2, { message: 'The username is too short' })
		.max(24),
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: 'Minimum password length is 8 characters' }),
})
