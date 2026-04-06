<template>
    <div class="main--layout">
        <NavigationBar />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import NavigationBar from "@/presentation/components/navigationBar/NavigationBar.vue";
import "./main-layout.css"
</script>