<template>
    <div class="user--icon">
        <img
            v-if="src"
            :src="src"
            alt=""
        />
        <IconUser
            v-else
        />
    </div>
</template>

<script setup lang="ts">
import "@/presentation/components/userIcon/user-icon.css";
import IconUser from "@/shared/icons/IconUser.vue";

defineProps<{
    src?: string;
}>()
</script>