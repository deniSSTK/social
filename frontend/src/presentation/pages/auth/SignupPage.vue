<template>
    <form class="auth--container" @submit.prevent="createUser">
        <h1 class="title"><span class="primary--font">Join</span> the Community</h1>
        <span class="title--description">Welcome! Share, scroll, and connect with your friends.</span>
        <Input
            placeholder="Input email"
            label="Email"
            v-model="request.email"
            type="email"
            minlength="5"
            maxlength="100"
            required
        />
        <Input
            placeholder="Create username"
            label="Username"
            v-model="request.username"
            minlength="5"
            maxlength="50"
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
        <div class="strong--container">
            <label>Password strong lvl</label>
            <span :class="`strong strong__${passwordStrongValue}`"></span>
        </div>
        <Input
            module="password"
            placeholder="Confirm password"
            label="Password"
            v-model="confirmPassword"
            minlength="8"
            required
        />
        <Button
            type="submit"
            :disabled="!ifCanSendRequest"
        >
            Join!
        </Button>
        <span class="description">Already have an account? <router-link :to="{name: Pages.LOG_IN}">Log in</router-link></span>
    </form>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "@vue/runtime-dom";
import {CreateUserRequest} from "@/core/interfaces/requests/UserRequests";
import ucContainer from "@/app/di/ucContainer";
import router from "@/app/router/router";
import zxcvbn from 'zxcvbn';
import {Pages} from "@/app/router/pagesInfo";

type passwordStrong = 'low' | 'mid' | 'high';

const request = reactive<CreateUserRequest>({
    email: "",
    password: "",
    username: ""
})

const confirmPassword = ref<string>("");

const ifCanSendRequest = computed(() =>
    request.username.length >= 5 &&
    request.email.length >= 5 &&
    request.password.length >= 8 &&
    confirmPassword.value === request.password
)

const passwordStrongValue = computed<passwordStrong>(() => {
    switch (zxcvbn(request.password).score) {
        case 0:
        case 1:
            return 'low'
        case 2:
            return 'mid'
        case 3:
        case 4:
            return 'high'
    }
})

const createUser = async () => {
    if (request.password === confirmPassword.value) {
        if (await ucContainer.userUsecase.create(request)) {
            await router.push({
                name: Pages.FEED
            })
        }
    }
}
</script>