import { loginSchema, registerSchema } from "../schema/auth/auth.schema";

export const validate_email = (email: string): boolean => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

export const validate_registration_body = (body: any) => {
	return registerSchema.parse(body);
};

export const validate_login_body = (body: any) => {
	return loginSchema.parse(body);
};
