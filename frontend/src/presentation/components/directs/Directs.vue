<template>
    <div class="directs--container">
        <Input
            placeholder="Search"
        />
        <div class="direct--container">
            <router-link
                :to="{
                    name: Pages.DIRECT,
                    params: {chatName: direct.name}
                }"
                class="direct"
                v-for="direct in directsList"
                :key="direct.id"
            >
                <UserIcon :src="direct.iconUrl" />
                <div class="direct--content">
                    <div class="direct--header">
                        <span
                            class="username"
                            :class="{ 'active': direct.name === currentDirectName }"
                        >
                            {{direct.name}}
                        </span>
                        <span class="time">10:00</span>
                    </div>
                    <div class="direct--body">
                        <span class="last--message">{{direct.lastMessage}}</span>
                        <IconCheck
                            v-if="direct.isLastMessageCurrentUser"
                            :class="{ 'read': direct.isRead }"
                        />
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import "./directs.scss";
import {ref} from "@vue/runtime-dom";
import UserIcon from "@/presentation/components/userIcon/UserIcon.vue";
import IconCheck from "@/shared/icons/IconCheck.vue";
import {onMounted} from "vue";
import {Pages} from "@/app/router/pagesInfo";
import {useRoute} from "vue-router";

interface IDirect {
    id: string;
    name: string;
    lastMessage: string;
    lastMessageDate: string;
    isLastMessageCurrentUser: boolean;

    isRead?: boolean;
    iconUrl?: string;
}

const route = useRoute()

const directsList = ref<IDirect[]>([
    {
        id: '1',
        name: 'Denisa',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: true
    },
    {
        id: '1',
        name: 'Denфis',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: true,
        isRead: true
    },
    {
        id: '1',
        name: 'Deфnis',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: false
    },
    {
        id: '1',
        name: 'Denрis',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: false
    },
    {
        id: '1',
        name: 'Deйnis',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: false
    },
    {
        id: '1',
        name: 'denis',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: false
    },
    {
        id: '1',
        name: 'Denis',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: false
    },
    {
        id: '1',
        name: 'Denis',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: false
    },
    {
        id: '1',
        name: 'Denиis',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: false
    },
    {
        id: '1',
        name: 'Denis',
        lastMessage: 'hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: false
    },
    {
        id: '2',
        name: 'denis denis denis',
        lastMessage: 'hello world you hello world',
        lastMessageDate: "2025-10-22T20:51:14.90159+03:00",
        isLastMessageCurrentUser: true
    },
]);
const currentDirectName = ref<string>(null)

onMounted(() => {
    const directName = route.params.chatName as string;
    if (directName) {
        currentDirectName.value = directName
    }
})
</script>