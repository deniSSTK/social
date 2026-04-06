<template>
    <div
        class="checkbox-container"
        v-bind="$attrs"
    >
        <label
            class="checkbox__label"
            v-if="label"
        >
            {{label}}
        </label>
        <button
            class="checkbox__input"
            :class="{ 'active': modelValue }"
            @click="toggle"
        >
            <div class="ball"></div>
        </button>
    </div>
</template>

<script setup lang="ts">
import "./checkbox.scss";

const props = defineProps<{
    modelValue: boolean,

    label?: string
}>()

const emit = defineEmits<{
    ( e: 'update:modelValue', value: boolean ): void
}>()

const toggle = () => {
    emit('update:modelValue', !props.modelValue)
}
</script>