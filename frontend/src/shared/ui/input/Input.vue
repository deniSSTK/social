<template>
    <div class="input--container">
        <label class="label">{{ label }}</label>

        <div class="input--wrapper">
            <input
                class="input"
                v-bind="$attrs"
                :type="module === 'password' && !canSeePassword ? 'password' : 'text'"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                :autocomplete="module === 'password' ? 'current-password' : 'username'"
            />

            <template v-if="module === 'password'">
                <div class="input--icon" @click="canSeePassword = !canSeePassword">
                    <IconEyeOpened v-if="canSeePassword" />
                    <IconEyeClosed v-else />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import "@/shared/ui/input/input.css";
import { ref } from "@vue/runtime-dom";
import IconEyeOpened from "@/shared/icons/IconEyeOpened.vue";
import IconEyeClosed from "@/shared/icons/IconEyeClosed.vue";

type inputModules = 'password';

defineOptions({ inheritAttrs: false })

defineProps<{
    module?: inputModules,
    label?: string,
    modelValue?: string
}>()

const canSeePassword = ref(false);
</script>
