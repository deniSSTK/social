export default interface IPost {
    id: string;
    authorId: string;
    description: string;
    firstImage: string;

    likesCount: number;
    commentsCount: number;

    createdAt: Date;

    pinned?: boolean;
    closeFriends?: boolean;
    ifCurrentUserLiked?: boolean;
}

export interface IPostComment {
    id: string;
    text: string;
    postId: string;
    authorId: string;

    createdAt: Date;
}

export interface IPostLike {
    postId: string;
    authorId: string;
    createdAt: Date;
}

export interface IPostHashtag {
    postId: string;
    hashtagId: string;
    position: number;
}


