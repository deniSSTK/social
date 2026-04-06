import UserUsecase from "@/core/usecaes/UserUsecase";
import PostUsecase from "@/core/usecaes/PostUsecase";
import FollowUsecase from "@/core/usecaes/FollowUsecase";

const ucContainer = {
    userUsecase: new UserUsecase(),
    postUsecase: new PostUsecase(),
    followUsecase: new FollowUsecase(),
}

export default ucContainer;