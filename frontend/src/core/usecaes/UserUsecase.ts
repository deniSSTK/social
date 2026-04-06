import {CreateUserRequest, LoginUserRequest} from "@/core/interfaces/requests/UserRequests";
import ucContainer from "@/app/di/ucContainer";
import {IGetUserInfo} from "@/core/interfaces/responses/UserResponses";
import {AuthState} from "@/infastracture/stores/authStore";
import repoContainer from "@/app/di/repoContainer";

export default class UserUsecase {
    async login(dto: LoginUserRequest): Promise<boolean> {
        return repoContainer.userRepository.login(dto);
    }

    async create(dto: CreateUserRequest): Promise<boolean> {
        return repoContainer.userRepository.create(dto);
    }

    async auth(): Promise<AuthState> {
        return repoContainer.userRepository.auth();
    }

    async getUsernameById(): Promise<string> {
        return repoContainer.userRepository.getUsernameById();
    }

    async getUserInfoByUsername(username: string): Promise<IGetUserInfo> {
        return repoContainer.userRepository.getUserInfoByUsername(username);
    }
}