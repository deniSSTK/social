<template>
    <div class="direct-page">

    </div>
</template>

<script setup lang="ts">
import "./direct-page.scss"
import {useRoute} from "vue-router";

const route = useRoute()

const chatName = route.params.chatName as string
</script>