<template>
    <AddPostPopup
        v-if="showAddPostPopup"
        :close-callback="() => showAddPostPopup = false"
    />

    <nav class="navigation--bar">
        <span class="fancy--font">Social</span>

        <router-link
            :to="{name: Pages.FEED}"
            class="navigation--bar__link"
            :class="{'current': route.name === 'feed'}"
        >
            <IconFeed /> <span class="navigation--bar__link--text">Feed</span>
        </router-link>
        <router-link
            :to="{name: Pages.DIRECT_LAYOUT}"
            class="navigation--bar__link"
            :class="{'current': route.name === 'direct' || route.path.includes('/direct/')}"
        >
            <IconChat /> <span class="navigation--bar__link--text">Chat</span>
        </router-link>
        <button
            class="navigation--bar__link"
        >
            <IconSearch /> <span class="navigation--bar__link--text">Search</span>
        </button>
        <button
            class="navigation--bar__link"
            @click="showAddPostPopup = true"
        >
            <IconAdd /> <span class="navigation--bar__link--text">Post</span>
        </button>
        <router-link
            :to="{name: Pages.USER_PROFILE_REDIRECT_TO_CURRENT}"
            class="navigation--bar__link"
            :class="{'current': route.name === 'user-profile' || route.path.includes('/u/')}"
        >
            <UserIcon src="/people.png" /> <span class="navigation--bar__link--text">Profile</span>
        </router-link>
    </nav>
</template>

<script setup lang="ts">
import "@/presentation/components/navigationBar/navigation-bar.scss";
import {Pages} from "@/app/router/pagesInfo";
import {ref} from "@vue/runtime-dom";
import {useRoute} from "vue-router";

import IconAdd from "@/shared/icons/IconAdd.vue";
import IconChat from "@/shared/icons/IconChat.vue";
import IconFeed from "@/shared/icons/IconFeed.vue";

import UserIcon from "@/presentation/components/userIcon/UserIcon.vue";
import AddPostPopup from "@/presentation/components/popup/AddPostPopup.vue";
import IconSearch from "@/shared/icons/IconSearch.vue";

const showAddPostPopup = ref<boolean>(false)
const route = useRoute()
</script>