<template>
    <button
        class="button"
        :class="variant"
        v-bind="$attrs"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
import '@/shared/ui/button/button.css';

type buttonTypes = 'primary' | 'secondary';

withDefaults(defineProps<{
    variant?: buttonTypes,
}>(), {
    variant: 'primary'
})
</script>
