export interface IUserPreview {
    id: string;
    username: string;
    iconUrl?: string;
}

export interface IGetUserInfo {
    id: string;
    username: string;

    following: number;
    followers: number;
    postCount: number;

    ifCurrentUserFollowed: boolean;

    description?: string;
    iconUrl?: string;
}