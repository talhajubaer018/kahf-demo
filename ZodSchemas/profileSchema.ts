import { z } from 'zod'

const isEmptyString = (value: string) => value.toString().trim() !== ''
const emailValidator = /^[\w.-]+@([\w-]+\.)+[\w-]{2,12}$/

export const createProfileSchema = z.object({
    firstName: z.string({ required_error: 'First name is required.' }).refine(isEmptyString, {
        message: 'First name is required.',
    }),
    lastName: z.string({ required_error: 'Last name is required.' }).refine(isEmptyString, {
        message: 'Last name is required.',
    }),
    email: z
        .string({ required_error: 'Email address is required.' })
        .min(1, { message: 'Email address is required.' })
        .refine(
            (value) => {
                return !value || emailValidator.test(value)
            },
            {
                message: `Invalid format: Use "name@email.com" pattern.`,
            }
        ),

})
