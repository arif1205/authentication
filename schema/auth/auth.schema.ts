import { z } from "zod";
import { validate_email } from "../../lib/validation";

export const loginSchema = z.object({
	email: z
		.string()
		.email({ message: "Enter valid email." })
		.refine(
			(email) => {
				return validate_email(email);
			},
			{ message: "Enter a valid sust email." }
		),
	password: z.string().min(6),
});

export const registerSchema = z
	.intersection(
		loginSchema,
		z.object({
			name: z
				.string()
				.min(3, { message: "Name must be at least 3 characters." }),
			role: z.enum(["admin", "user"], {
				errorMap: () => ({
					message: "Select a valid role",
				}),
			}),
			confirmPassword: z.string().min(6).optional(),
			isVerified: z.boolean().optional(),
			about: z.string().optional(),
		})
	)
	.superRefine(({ confirmPassword, password, email }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
				path: ["confirmPassword"],
			});
		}
	});
