// server/src/modules/auth/auth.service.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';
import { AppError } from '../../middlewares/errorHandler';
import type { AuthResponseDto, LoginDto, RegisterDto, UserProfileDto } from './auth.schema';

const SALT_ROUNDS = 10;
const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

function signAccessToken(userId: string, email: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new AppError('Thiếu biến môi trường JWT_SECRET', 500);
    }
    return jwt.sign({ userId, email }, secret, { expiresIn: SEVEN_DAYS_IN_SECONDS });
}

function mapToUserProfile(user: {
    id: string;
    email: string;
    fullName: string;
    createdAt: Date;
}): UserProfileDto {
    return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt.toISOString(),
    };
}

export const authService = {
    register: async (dto: RegisterDto): Promise<AuthResponseDto> => {
        const existingUser = await prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new AppError('Email này đã được đăng ký tài khoản', 409);
        }

        const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

        const createdUser = await prisma.user.create({
            data: {
                email: dto.email,
                fullName: dto.fullName,
                passwordHash,
            },
        });

        const token = signAccessToken(createdUser.id, createdUser.email);

        return {
            token,
            user: mapToUserProfile(createdUser),
        };
    },

    login: async (dto: LoginDto): Promise<AuthResponseDto> => {
        const user = await prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new AppError('Email hoặc mật khẩu không chính xác', 401);
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new AppError('Email hoặc mật khẩu không chính xác', 401);
        }

        const token = signAccessToken(user.id, user.email);

        return {
            token,
            user: mapToUserProfile(user),
        };
    },

    getCurrentUser: async (userId: string): Promise<UserProfileDto> => {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new AppError('Không tìm thấy thông tin người dùng', 404);
        }

        return mapToUserProfile(user);
    },
};