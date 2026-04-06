import PostRepository from "@/core/repositories/PostRepository";
import {api, ok} from "@/infastracture/http/client";
import {IInsertPostRequest} from "@/core/interfaces/requests/PostRequest";
import {IGetFeedPostsByUserId, IGetPostByUserId, IGetPostCounts} from "@/core/interfaces/responses/PostResponses";

export default class PostApiRepository implements PostRepository {
    async getAllUserPosts(userId: string, offset: number): Promise<IGetPostByUserId[]> {
        try {
            const { data } = await api.get(`/posts/user/${userId}/${offset}`);
            return data;
        } catch {
            return [];
        }
    }

    async createPost(dto: IInsertPostRequest): Promise<boolean> {
        try {
            const formData = new FormData();
            formData.append(
                'targetPost',
                JSON.stringify({targetPost: dto.targetPost})
            )

            dto.images.forEach(img => {
                formData.append('images', img)
            })

            const { status } = await api.post('/posts/', formData)
            return ok(status)
        } catch {
            return false;
        }
    }

    async getPostCountsById(postId: string): Promise<IGetPostCounts> {
        try {
            const { data } = await api.get(`/posts/counts/${postId}`);
            return data;
        } catch {
            return null
        }
    }

    async getFeed(offset: number): Promise<IGetFeedPostsByUserId[]> {
        try {
            const { data } = await api.get(`/posts/feed/${offset}`);
            return data;
        } catch {
            return [];
        }
    }

    async likePost(postId: string): Promise<boolean> {
        try {
            const { status } = await api.patch(`/posts/like/${postId}`);
            return ok(status)
        } catch {
            return false;
        }
    }

    async dislikePost(postId: string): Promise<boolean> {
        try {
            const { status } = await api.delete(`/posts/like/${postId}`);
            return ok(status)
        } catch {
            return false;
        }
    }
}