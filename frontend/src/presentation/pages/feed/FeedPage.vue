<template>
    <div class="page">
        <div class="stories">
            <button
                class="stories__item stories__add"
            >
                <UserIcon src="/people.png" alt="" />
                <span class="description">Your story</span>
            </button>
            <div
                class="stories__item stories__view"
                v-for="story in storiesList"
                :class="{'watched': story.watched}"
            >
                <UserIcon class="preview--image preview--image__profile" :src="story.previewUrl" alt="" />
                <img class="preview--image preview--image__story" :src="story.previewUrl" alt="">
            </div>
        </div>
        <div class="posts">
            <div
                class="post"
                v-for="post in postsList"
            >
                <router-link
                    class="post__header"
                    :to="{
                        name: Pages.USER_PROFILE,
                        params: { username: post.author.username }
                    }"
                >
                    <UserIcon :src="post.author.iconUrl" />
                    <div class="post__header__description">
                        <span>{{post.author.username}}</span>
                        <span class="created--at">{{timeAgo(post.createdAt)}}</span>
                    </div>
                </router-link>
                <div class="post__images" :class="'count-'+post.imagesUrls.length.toString()">
                    <img
                        v-for="image in post.imagesUrls"
                        :src="image"
                        alt=""
                    >
                </div>
                <span
                    v-if="post.description"
                    class="post__description"
                    :class="{'show': showDescriptionPosts[post.id]}"
                    ref="descriptionRefs"
                    :data-post-id="post.id"
                >
                    {{post.description}}
                </span>
                <button
                    v-if="post.description && isDescriptionOverflowing(post.id)"
                    class="post__description--button"
                    @click="toggleDescription(post.id)"
                >
                    {{showDescriptionPosts[post.id] ? 'Hide' : 'Show more'}}
                </button>
                <div class="post__info">
                    <div
                        class="post__info--item"
                        @click="toggleLikePost(post.id)"
                    >
                        <IconHeart :class="{'liked': post.ifCurrentUserLiked}" /> {{post.likesCount}}
                    </div>
                    <div class="post__info--item"><IconComment /> {{post.commentsCount}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {nextTick, ref} from "@vue/runtime-dom";
import "./feed-page.scss";
import UserIcon from "@/presentation/components/userIcon/UserIcon.vue";
import {onMounted} from "vue";
import {IGetFeedPostsByUserId} from "@/core/interfaces/responses/PostResponses";
import ucContainer from "@/app/di/ucContainer";
import IconHeart from "@/shared/icons/IconHeart.vue";
import IconComment from "@/shared/icons/IconComment.vue";
import {Pages} from "@/app/router/pagesInfo";
import {timeAgo} from "@/presentation/utils/timeUtils";
import {preloadImage} from "@/presentation/utils/imageUtils";

interface iStory {
    previewUrl: string;
    authorIconUrl: string;
    watched?: boolean;
}

const postsList = ref<IGetFeedPostsByUserId[]>([])
const storiesList = ref<iStory[]>([])
const descriptionRefs = ref<HTMLElement[]>([])
const showDescriptionPosts = ref<Record<string, boolean>>({})
const overflowingDescriptions = ref<Record<string, boolean>>({})

const toggleLikePost = async (postId: string) => {
    const post = postsList.value.find(p => p.id === postId);
    if (!post) return;

    const prevCount = post.likesCount;
    const wasLiked = post.ifCurrentUserLiked;

    post.likesCount += wasLiked ? -1 : 1;
    post.ifCurrentUserLiked = !wasLiked;

    const success = wasLiked
        ? await ucContainer.postUsecase.dislikePost(postId)
        : await ucContainer.postUsecase.likePost(postId);

    if (!success) {
        post.likesCount = prevCount;
        post.ifCurrentUserLiked = wasLiked;
    }
};

const toggleDescription = (postId: string) => {
    if (!showDescriptionPosts.value[postId]) {
        showDescriptionPosts.value[postId] = true;
    } else {
        showDescriptionPosts.value[postId] = !showDescriptionPosts.value[postId];
    }
}

const isDescriptionOverflowing = (postId: string) => {
    return overflowingDescriptions.value[postId] ?? false;
}

const checkOverflow = () => {
    nextTick(() => {
        descriptionRefs.value.forEach((el: HTMLElement) => {
            if (el) {
                const postId = el.getAttribute('data-post-id');
                if (postId) {
                    overflowingDescriptions.value[postId] = el.scrollHeight > el.clientHeight;
                }
            }
        });
    });
}

onMounted(async () => {
    storiesList.value = storiesList.value.sort((a, b) => {
        const aWatched = a.watched ?? false;
        const bWatched = b.watched ?? false;
        return Number(aWatched) - Number(bWatched);
    });

    const posts = await ucContainer.postUsecase.getFeed(postsList.value.length)

    for (const post of posts) {
        for (const img of post.imagesUrls) {
            await preloadImage(img)
        }
    }

    postsList.value = posts
    checkOverflow();
})
</script>