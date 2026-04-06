import {createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";

import ucContainer from "@/app/di/ucContainer";
import {authPages, Pages} from "@/app/router/pagesInfo";
import useAuthStore from "@/infastracture/stores/authStore";

import MainLayout from "@/presentation/layout/main/MainLayout.vue";
import AuthLayout from "@/presentation/layout/auth/AuthLayout.vue";
import DirectLayout from "@/presentation/layout/direct/DirectLayout.vue";

const FeedPage = () => import("@/presentation/pages/feed/FeedPage.vue");
const LoginPage = () => import("@/presentation/pages/auth/LoginPage.vue");
const SignupPage = () => import("@/presentation/pages/auth/SignupPage.vue");
const DirectPage = () => import("@/presentation/pages/direct/DirectPage.vue");
const UserProfilePage = () => import("@/presentation/pages/userProfile/UserProfilePage.vue");

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainLayout,
        name: Pages.MAIN_LAYOUT,
        children: [
            {
                path: '',
                component: FeedPage,
                name: Pages.FEED
            },
            {
                path: 'u',
                component: UserProfilePage,
                name: Pages.USER_PROFILE_REDIRECT_TO_CURRENT,
                beforeEnter: getUsername
            },
            {
                path: 'u/:username',
                component: UserProfilePage,
                name: Pages.USER_PROFILE
            },
            {
                path: 'direct',
                component: DirectLayout,
                name: Pages.DIRECT_LAYOUT,
                children: [
                    {
                        path: ':chatName',
                        name: Pages.DIRECT,
                        component: DirectPage,
                    }
                ]
            },
        ]
    },
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: 'log-in',
                component: LoginPage,
                name: Pages.LOG_IN,
            },
            {
                path: 'sign-up',
                component: SignupPage,
                name: Pages.SIGN_UP,
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: Pages.NOT_FOUND,
        redirect: { name: Pages.FEED }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, _, next) => {
    const auth = useAuthStore()
    if (auth.userId) {
        return next()
    }

    const user = await ucContainer.userUsecase.auth()
    const userId = user.userId
    if (userId) {
        auth.setUser(user)
    }

    if (!userId && !authPages.includes(to.name.toString())) {
        return next({ name: Pages.LOG_IN })
    } else if (userId && authPages.includes(to.name.toString())) {
        return next({ name: Pages.FEED })
    }

    next()
})

async function getUsername() {
    const username = await ucContainer.userUsecase.getUsernameById();
    if (username) {
        await router.push({
            name: Pages.USER_PROFILE,
            params: {username}
        })
    } else {
        await router.push({
            name: Pages.FEED,
        })
    }
}

export default router;