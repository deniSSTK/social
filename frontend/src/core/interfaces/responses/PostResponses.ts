import {IUserPreview} from "@/core/interfaces/responses/UserResponses";

export interface IGetPostByUserId {
    id: string;
    firstImage: string;

    pinned?: boolean;
    closeFriends?: boolean;
}

export interface IGetPostCounts {
    likesCount: number;
    commentsCount: number;
}

export interface IGetFeedPostsByUserId {
    id: string;
    description: string;
    imagesUrls: string[];
    imagesCount: number;
    likesCount: number;
    commentsCount: number;
    author: IUserPreview;
    createdAt: string;
    ifCurrentUserLiked: boolean;
}