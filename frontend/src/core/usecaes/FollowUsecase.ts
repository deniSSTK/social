import repoContainer from "@/app/di/repoContainer";

export default class FollowUsecase {
    async insert(followTo: string): Promise<boolean> {
        return repoContainer.followRepository.insert(followTo)
    }

    async delete(followTo: string): Promise<boolean> {
        return repoContainer.followRepository.delete(followTo)
    }
}