import {IInsertPostRequest} from "@/core/interfaces/requests/PostRequest";
import {IGetFeedPostsByUserId, IGetPostByUserId, IGetPostCounts} from "@/core/interfaces/responses/PostResponses";

export default interface PostRepository {
    getAllUserPosts(userId: string, offset: number): Promise<IGetPostByUserId[]>;
    createPost(dto: IInsertPostRequest): Promise<boolean>
    getPostCountsById(postId: string): Promise<IGetPostCounts>;
    getFeed(offset: number): Promise<IGetFeedPostsByUserId[]>;
    likePost(postId: string): Promise<boolean>;
    dislikePost(postId: string): Promise<boolean>;
}