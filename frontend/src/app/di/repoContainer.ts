import UserApiRepository from "@/infastracture/repositories/UserApiRepository";
import PostApiRepository from "@/infastracture/repositories/PostApiRepository";
import FollowApiRepository from "@/infastracture/repositories/FollowApiRepository";

const repoContainer = {
    userRepository: new UserApiRepository(),
    postRepository: new PostApiRepository(),
    followRepository: new FollowApiRepository(),
}

export default repoContainer;