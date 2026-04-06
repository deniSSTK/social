export default interface FollowRepository {
    insert(followToId: string): Promise<boolean>;
    delete(followToId: string): Promise<boolean>;
}