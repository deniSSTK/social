import FollowRepository from "@/core/repositories/FollowRepository";
import {api, ok} from "@/infastracture/http/client";

export default class FollowApiRepository implements FollowRepository {
    async insert(followToId: string): Promise<boolean> {
        const { status } = await api.post(`/follow/${followToId}`);
        return ok(status)
    }

    async delete(followToId: string): Promise<boolean> {
        const { status } = await api.delete(`/follow/${followToId}`);
        return ok(status)
    }
}