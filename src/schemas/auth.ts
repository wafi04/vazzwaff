import z from 'zod';
export const passwordSchema = z
  .string()
  .min(8, { message: 'Password Minimal 8 Karakter' });

export const loginSchema = z.object({
  username: z.string(),
  password: passwordSchema,
});

export const registerSchema = z.object({
  username: z.string(),
  name: z.string(),
  whatsapp: z.number().optional(),
  password: passwordSchema,
});

export const updateUser = z.object({
  username: z.string(),
  name: z.string(),
  whatsapp: z.number(),
});
export type loginAuth = z.infer<typeof loginSchema>;
export type RegisterAuth = z.infer<typeof registerSchema>;
export type UpdateUser = z.infer<typeof updateUser>;


export interface SessionsData {
  createdAt: string
expires: string
id: string
ipAdress: string
userAgent: string
}
