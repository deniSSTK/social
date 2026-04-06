import {CreateUserRequest, LoginUserRequest} from "@/core/interfaces/requests/UserRequests";
import {IGetUserInfo} from "@/core/interfaces/responses/UserResponses";
import {AuthState} from "@/infastracture/stores/authStore";

export default interface UserRepository {
    login(dto: LoginUserRequest): Promise<boolean>;
    create(dto: CreateUserRequest): Promise<boolean>;
    auth(): Promise<AuthState> ;
    getUsernameById(): Promise<string>;
    getUserInfoByUsername(username: string): Promise<IGetUserInfo>;
}