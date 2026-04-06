<template>
    <div class="page">
        <header class="header">
            <div class="user--profile--info">
                <UserIcon
                    :src="currentUserInfo.iconUrl"
                    class="user--icon__header"
                />
                <div class="header--content__container">
                    <div class="header--content header--content__actions" v-if="currentUserInfo.id">
                        <span class="username">{{currentUserInfo.username}}</span>
                        <template v-if="isSelf">
                            <Button variant="secondary">Edit Profile</Button>
                        </template>
                        <template v-else>
                            <Button
                                variant="secondary"
                                @click="toggleFollow"
                            >
                                {{currentUserInfo.ifCurrentUserFollowed ? 'Unfollow' : 'Follow'}}
                            </Button>
                            <Button
                                variant="secondary"
                                @click="redirectToDirect()"
                            >
                                Message</Button>
                        </template>
                    </div>
                    <div class="header--content header--content__statistic">
                        <div class="statistic--container">
                            <span class="statistic--value">{{currentUserInfo.postCount}}</span>
                            <span class="statistic--description">Posts</span>
                        </div>
                        <div class="statistic--container">
                            <span class="statistic--value">{{currentUserInfo.followers}}</span>
                            <span class="statistic--description">Followers</span>
                        </div>
                        <div class="statistic--container">
                            <span class="statistic--value">{{currentUserInfo.following}}</span>
                            <span class="statistic--description">Following</span>
                        </div>
                    </div>
                    <div class="header--content header--content__description">
                        <span v-if="currentUserInfo.description" class="">{{currentUserInfo.description}}</span>
                    </div>
                </div>
            </div>
        </header>

        <div class="profile--images--container">
            <nav class="nav">
                <div
                    class="nav--content"
                    :class="{'chosen': currentProfileViewType === 'posts'}"
                    @click="changeProfileViewType('posts')"
                >
                    <IconPosts /> Posts
                </div>
                <div
                    class="nav--content"
                    :class="{'chosen': currentProfileViewType === 'mentions'}"
                    @click="changeProfileViewType('mentions')"
                >
                    <IconMentions /> Mentions
                </div>
            </nav>
            <div class="images--container">
                <div
                    class="image--container"
                    v-for="post in currentPosts"
                    :key="post.id"
                    @mouseenter="getPostCounts(post.id)"
                >
                    <img
                        class="image"
                        :src="post.firstImage"
                        alt="null"
                    >
                    <div class="image__info">
                        <div class="image__info__container"><IconHeart /> {{post.likesCount}}</div>
                        <div class="image__info__container"><IconComment /> {{post.commentsCount}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from "@/app/router/router";
import {useRoute} from "vue-router";
import {Pages} from "@/app/router/pagesInfo";
import ucContainer from "@/app/di/ucContainer";
import {computed, onBeforeMount, reactive, ref} from "@vue/runtime-dom";

import IPost from "@/core/entities/Post";
import {IGetUserInfo} from "@/core/interfaces/responses/UserResponses";
import {preloadImage} from "@/presentation/utils/imageUtils";
import {mapGetPostsToPost} from "@/infastracture/mappers/postMap";

import IconPosts from "@/shared/icons/IconPosts.vue";
import IconHeart from "@/shared/icons/IconHeart.vue";
import IconComment from "@/shared/icons/IconComment.vue";
import IconMentions from "@/shared/icons/IconMentions.vue";
import useAuthStore from "@/infastracture/stores/authStore";
import "@/presentation/pages/userProfile/user-profile-page.scss";

type profileViewType = 'posts' | 'mentions'

const auth = useAuthStore()
const route = useRoute();

const isSelf = ref<boolean>(null)
const posts = ref<IPost[]>([]);
const userPostsIdsList = ref<string[]>([]);
const mentionsPostsIdsList = ref<string[]>([]);

const currentUserInfo = reactive<IGetUserInfo>({
    id: null,
    username: null,
    following: null,
    followers: null,
    postCount: null,
    ifCurrentUserFollowed: null,
})

const currentProfileViewType = ref<profileViewType>(
    route.query.view !== undefined
        ? route.query.view as profileViewType
        : 'posts'
);

const currentPosts = computed<IPost[]>(() =>
    currentProfileViewType.value === 'posts'
        ? posts.value.filter(post => userPostsIdsList.value.includes(post.id))
        : posts.value.filter(post => mentionsPostsIdsList.value.includes(post.id))
);

async function loadUserInfo() {
    const username = route.params.username as string
    const data = await ucContainer.userUsecase.getUserInfoByUsername(username);
    if (!data.id) await router.push({name: Pages.FEED})
    Object.assign(currentUserInfo, data);
    currentUserInfo.username = username

    isSelf.value = currentUserInfo.id === auth.userId
}

async function loadPosts() {
    const postsData = await ucContainer.postUsecase.getAllUserPosts(currentUserInfo.id, currentPosts.value.length)
    if (postsData) {
        postsData.forEach(post => preloadImage(post.firstImage))
        posts.value = postsData.map(post => mapGetPostsToPost(post))

        userPostsIdsList.value = postsData.map(post => post.id)
    }
}

const changeProfileViewType = async (type: profileViewType) => {
    const queries = { ...route.query };
    if (type === "posts") {
        delete queries.view;

        await router.replace({
            path: route.path,
            query: queries
        })
        currentProfileViewType.value = "posts";
    } else {
        await router.replace({
            path: route.path,
            query: {
                ...queries,
                'view': type,
            }
        })
        currentProfileViewType.value = type;
    }
}

const getPostCounts = async (postId: string) => {
    const targetPost = posts.value.find(post => post.id === postId);
    if (
        (!targetPost.commentsCount && targetPost.commentsCount !== 0) &&
        (!targetPost.likesCount && targetPost.likesCount !== 0)
    ) {
        const data = await ucContainer.postUsecase.getPostCountsById(postId);
        posts.value.map(post => {
            if (post.id === postId) {
                post.commentsCount = data.commentsCount
                post.likesCount = data.likesCount
            }
        })
    }
}

const toggleFollow = async () => {
    let success: boolean
    const prevFollowerCount = currentUserInfo.followers

    if (currentUserInfo.ifCurrentUserFollowed) {
        success = await ucContainer.followUsecase.delete(currentUserInfo.id)
        currentUserInfo.followers--
    } else {
        success = await ucContainer.followUsecase.insert(currentUserInfo.id)
        currentUserInfo.followers++
    }

    if (success) {
        currentUserInfo.ifCurrentUserFollowed = !currentUserInfo.ifCurrentUserFollowed
    } else {
        currentUserInfo.followers = prevFollowerCount
    }
}

const redirectToDirect = async () => {
    await router.push({
        name: Pages.DIRECT,
        params: {
            chatName: currentUserInfo.username
        }
    })
}

onBeforeMount(async () => {
    await loadUserInfo()

    await loadPosts()

    // if (currentProfileViewType.value === 'posts') {
    //     userPostsIdsList.value = postsData.map(post => post.id)
    // } else {
    //     mentionsPostsIdsList.value = postsData.map(post => post.id)
    // }
})
</script>