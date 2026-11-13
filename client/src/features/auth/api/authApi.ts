// client/src/features/auth/api/authApi.ts
import { apiClient } from '../../../services/apiClient';
import type { AuthResponse, LoginPayload, RegisterPayload, UserProfile } from '../types/auth.types';

export const authApi = {
    register: (payload: RegisterPayload) =>
        apiClient<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(payload),
        }),

    login: (payload: LoginPayload) =>
        apiClient<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        }),

    getMe: () => apiClient<UserProfile>('/auth/me'),
};