import {IInsertPostRequest} from "@/core/interfaces/requests/PostRequest";
import ucContainer from "@/app/di/ucContainer";
import IPost from "@/core/entities/Post";
import {IGetFeedPostsByUserId, IGetPostByUserId, IGetPostCounts} from "@/core/interfaces/responses/PostResponses";
import repoContainer from "@/app/di/repoContainer";

export default class PostUsecase {
    async createPost(dto: IInsertPostRequest): Promise<boolean> {
        return repoContainer.postRepository.createPost(dto);
    }

    async getAllUserPosts(userId: string, offset: number): Promise<IGetPostByUserId[]> {
        return repoContainer.postRepository.getAllUserPosts(userId, offset);
    }

    async getPostCountsById(postId: string): Promise<IGetPostCounts> {
        return repoContainer.postRepository.getPostCountsById(postId);
    }

    async getFeed(offset: number): Promise<IGetFeedPostsByUserId[]> {
        return repoContainer.postRepository.getFeed(offset);
    }

    async likePost(postId: string): Promise<boolean> {
        return repoContainer.postRepository.likePost(postId);
    }

    async dislikePost(postId: string): Promise<boolean> {
        return repoContainer.postRepository.dislikePost(postId);
    }
}