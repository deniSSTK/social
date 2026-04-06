<template>
    <form class="auth--container" @submit.prevent="login">
        <h1 class="title"><span class="primary--font">Welcome</span> Back</h1>
        <span class="title--description">Your friends are waiting — continue sharing and connecting.</span>
        <Input
            placeholder="Input email or username"
            label="Email or username"
            v-model="request.emailOrUsername"
            minlength="5"
            maxlength="100"
            required
        />
        <Input
            module="password"
            placeholder="Password"
            label="Password"
            v-model="request.password"
            minlength="8"
            required
        />
        <Button type="submit" :disabled="!ifCanSendRequest">
            Login
        </Button>
        <span class="description">Don't have an account? <router-link :to="{name: Pages.SIGN_UP}">Sign up</router-link></span>
    </form>
</template>

<script setup lang="ts">
import {computed, reactive} from "@vue/runtime-dom";
import {LoginUserRequest} from "@/core/interfaces/requests/UserRequests";
import ucContainer from "@/app/di/ucContainer";
import router from "@/app/router/router";
import {Pages} from "@/app/router/pagesInfo";

const request = reactive<LoginUserRequest>({
    emailOrUsername: "",
    password: ""
})

const ifCanSendRequest = computed(() =>
    request.emailOrUsername.length >= 5 &&
    request.password.length >= 8
)

const login = async () => {
    if (await ucContainer.userUsecase.login(request)) {
        await router.push({
            name: Pages.FEED
        })
    }
}
</script>