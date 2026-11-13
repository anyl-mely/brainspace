// client/src/features/auth/types/auth.types.ts
export interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
}

export interface AuthResponse {
    token: string;
    user: UserProfile;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
}