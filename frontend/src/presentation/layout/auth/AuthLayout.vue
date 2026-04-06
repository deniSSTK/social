<template>
    <div class="auth-page">
        <router-view />
        <div class="auth--image">
            <img src="/auth-image.png" alt="">
            <span class="fancy--font">Social</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import "@/presentation/layout/auth/auth-layout.scss";
</script>