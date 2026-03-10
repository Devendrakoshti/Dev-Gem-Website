
import { API_BASE_URL } from '../config/appConfig';

const STORAGE_KEY = 'nexus_auth_session';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

class ApiClient {
    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const session = localStorage.getItem(STORAGE_KEY);
        const token = session ? JSON.parse(session).token : null;

        const headers: HeadersInit = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        let url = `${API_BASE_URL}${endpoint}`;
        if (options.params) {
            const searchParams = new URLSearchParams(options.params);
            url += `?${searchParams.toString()}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            localStorage.removeItem(STORAGE_KEY);
            window.location.href = '/auth/login';
            throw new Error('Unauthorized');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    }

    get<T>(endpoint: string, params?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'GET', params });
    }

    post<T>(endpoint: string, body: any) {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    put<T>(endpoint: string, body: any) {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    patch<T>(endpoint: string, body: any) {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }

    delete<T>(endpoint: string) {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();
