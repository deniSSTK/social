import {IGetPostByUserId, IGetPostCounts} from "@/core/interfaces/responses/PostResponses";
import IPost from "@/core/entities/Post";

export const mapGetPostsToPost = (post: IGetPostByUserId): IPost => {
    return {
        id: post.id,
        pinned: post.pinned,
        firstImage: post.firstImage,
        closeFriends: post.closeFriends,

        authorId: null,
        createdAt: null,
        likesCount: null,
        description: null,
        commentsCount: null,
        ifCurrentUserLiked: null,
    }
}