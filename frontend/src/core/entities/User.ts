import UserStatus from "@/core/enums/UserStatus";

export default interface IUser {
    id: string;
    username: string;
    email: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAuthor {
    username: string;
    iconUrl: string;
}