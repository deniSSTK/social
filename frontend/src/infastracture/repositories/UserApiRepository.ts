import UserRepository from "@/core/repositories/UserRepository";
import {CreateUserRequest, LoginUserRequest} from "@/core/interfaces/requests/UserRequests";
import {api, ok} from "@/infastracture/http/client";
import {IGetUserInfo} from "@/core/interfaces/responses/UserResponses";
import {AuthState} from "@/infastracture/stores/authStore";

export default class UserApiRepository implements UserRepository {
    async login(dto: LoginUserRequest): Promise<boolean> {
        try {
            const { status } = await api.post('/users/log-in', dto);
            return ok(status);
        } catch {
            return false;
        }
    }

    async create(dto: CreateUserRequest): Promise<boolean> {
        try {
            const { status } = await api.post('/users', dto);
            return ok(status)
        } catch {
            return false;
        }
    }

    async auth(): Promise<AuthState> {
        try {
            const { data } = await api.get('/users/auth');
            return data;
        } catch {
            return null;
        }
    }

    async getUsernameById(): Promise<string> {
        try {
            const { data } = await api.get('/users/id/username');
            return data;
        } catch {
            return null;
        }
    }

    async getUserInfoByUsername(username: string): Promise<IGetUserInfo> {
        try {
            const { data } = await api.get(`/users/info-by/username/${username}`);
            // headers.etag
            return data
        } catch {
            return null;
        }
    }
}