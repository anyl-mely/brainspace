// server/src/modules/auth/auth.schema.ts
import { z } from 'zod';

export const registerSchema = z.object({
    fullName: z
        .string({ message: 'Họ tên là bắt buộc' })
        .trim()
        .min(2, 'Họ tên phải có ít nhất 2 ký tự')
        .max(100, 'Họ tên tối đa 100 ký tự'),
    email: z
        .string({ message: 'Email là bắt buộc' })
        .trim()
        .toLowerCase()
        .email('Định dạng email không hợp lệ'),
    password: z
        .string({ message: 'Mật khẩu là bắt buộc' })
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .max(72, 'Mật khẩu tối đa 72 ký tự'),
});

export const loginSchema = z.object({
    email: z
        .string({ message: 'Email là bắt buộc' })
        .trim()
        .toLowerCase()
        .email('Định dạng email không hợp lệ'),
    password: z
        .string({ message: 'Mật khẩu là bắt buộc' })
        .min(1, 'Vui lòng nhập mật khẩu'),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;

export interface UserProfileDto {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
}

export interface AuthResponseDto {
    token: string;
    user: UserProfileDto;
}