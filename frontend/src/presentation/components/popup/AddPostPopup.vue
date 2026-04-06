<template>
    <teleport to="body">
        <input
            class="none"
            type="file"
            ref="fileInputRef"
            @change="onFilesSelected"
            accept="image/*"
            multiple
        >

        <div class="popup__wrapper">
            <div class="popup__container">
                <div class="popup__header">
                    <IconClose class="close" @click="closeCallback" />
                    <div class="button--container">
                        <Button
                            v-if="currentStage === 'post-editing'"
                            @click="currentStage = 'image-editing'"
                            variant="secondary"
                        >
                            Back
                        </Button>
                        <Button
                            v-if="currentStage !== 'upload'"
                            @click="toggleStateButton"
                        >
                            {{currentStage === 'image-editing' ? 'Next' : 'Post'}}
                        </Button>
                    </div>
                </div>

                <template v-if="currentStage === 'upload'">
                    <div
                        class="box upload__container"
                        @drop.prevent="onDrop"
                        @dragover.prevent="onDragOver"
                        @dragleave="onDragLeave"
                        @dragenter.prevent="onDragEnter"
                    >
                        <IconUpload class="upload__image" />
                        <span class="text-center">Drag photos here</span>
                        <Button
                            class="image__add"
                            @click="toggleAddFile"
                        >
                            Select from device
                        </Button>
                    </div>
                </template>

                <template v-else>
                    <div class="edit--image--container">
                        <div
                            v-if="imagesToUpload.length > 1 && currentStage === 'image-editing'"
                            class="all-images--preview--container"
                        >
                            <img
                                v-for="img in imagesToUpload"
                                :key="img.url"
                                class="all-image--preview"
                                :class="{
                                    'selected': currentImagePreviewURL === img.url,
                                    ['effect__' + imagesToToggleFilter[img.url]]: imagesToToggleFilter[img.url],
                                }"
                                :src="img.url"
                                alt=""
                                @click="currentImagePreviewURL = img.url"
                            />
                        </div>
                        <div class="image--preview__container">
                            <img
                                class="box image--preview"
                                :class="`effect__${imagesToToggleFilter[currentImagePreviewURL]}`"
                                :src="currentImagePreviewURL"
                                alt=""
                            >
                            <IconAdd
                                v-if="currentStage === 'image-editing'"
                                @click="toggleAddFile"
                                class="add-button"
                            />
                        </div>

                        <template v-if="currentStage === 'image-editing'">
                            <div class="effects__wrapper">
                                <span class="title">Filters</span>
                                <div class="effects__container">
                                    <div
                                        class="effect__item"
                                        v-for="effect in effectsList"
                                        :key="currentImagePreviewURL + '-' + effect"
                                        :class="{
                                            'chosen': imagesToToggleFilter[currentImagePreviewURL] &&
                                                imagesToToggleFilter[currentImagePreviewURL] === effect
                                        }"
                                        @click="toggleChangeFilter(effect)"
                                    >
                                        <div class="image--container">
                                            <img
                                                :src="currentImagePreviewURL"
                                                :class="`effect__${effect}`"
                                                alt=""
                                            />
                                        </div>
                                        <span>{{effect.toLowerCase().replace("_", " ")}}</span>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="currentStage === 'post-editing'">
                            <div class="description-container">
                                <textarea
                                    class="description__input"
                                    v-model="descriptionInput"
                                    maxlength="1000"
                                />
                                <span
                                    class="description__input-symbol-count"
                                    :class="{ 'full': descriptionSymbolCount >= 1000 }"
                                >
                                    {{descriptionSymbolCount}}/1000
                                </span>
                                <Checkbox v-model="isPostCloseFriends" label="Close Friends" />
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {computed, onUnmounted, ref} from "@vue/runtime-dom";
import IconClose from "@/shared/icons/IconClose.vue";

import "./add-post-popup.scss";
import {IImageToUpload, IInsertPostRequest} from "@/core/interfaces/requests/PostRequest";
import IconAdd from "@/shared/icons/IconAdd.vue";
import IconUpload from "@/shared/icons/IconUpload.vue";
import ucContainer from "@/app/di/ucContainer";

const props = defineProps<{
    closeCallback: () => void;
}>()

const isDragging = ref<boolean>(false);
const currentStage = ref<Stages>('upload')
const fileInputRef = ref<HTMLInputElement>();
const imagesToUpload = ref<IImageToUpload[]>([])
const imagesToToggleFilter = ref<Record<string, string>>({})
const currentImagePreviewURL = ref<string | null>(null)

const descriptionInput = ref<string>("")
const isPostCloseFriends = ref<boolean>(false);
const descriptionSymbolCount = computed(() => descriptionInput.value.length)

type Stages = 'upload' | 'image-editing' | 'post-editing'

const effectsList = [
    "BLACK_WHITE",
    "SEPIA",
    "BRIGHT",
    "DARK",
    "CONTRAST",
    "SATURATE",
    "INVERT",
    "HUE_ROTATE",
    "VINTAGE"
];

const toggleAddFile = () => {
    fileInputRef.value?.click();
}

const onFilesSelected = () => {
    try {
        const files = fileInputRef.value?.files;
        if (!files) return;

        for (const file of Array.from(files)) {
            imagesToUpload.value.push({
                file,
                url: URL.createObjectURL(file),
            });
        }

        currentImagePreviewURL.value = imagesToUpload.value[0].url
        currentStage.value = 'image-editing'
    } catch (e) {
        console.error(`[UPLOAD IMAGE]: `, e)
    }
};

const toggleChangeFilter = (effect: string) => {
    if (imagesToToggleFilter.value[currentImagePreviewURL.value] === effect) {
        delete imagesToToggleFilter.value[currentImagePreviewURL.value];
    } else {
        imagesToToggleFilter.value[currentImagePreviewURL.value] = effect;
    }
}

const onDragEnter = () => {
    isDragging.value = true;
};

const onDragLeave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    isDragging.value = false;
};

const onDragOver = () => {
    isDragging.value = true;
};

const onDrop = (e: Event) => {

};

const applyFilterToImageByUrl = async (url: string, effect: string) => {
    const index = imagesToUpload.value.findIndex(img => img.url === url);
    if (index === -1) return;

    const imgObj = imagesToUpload.value[index];

    let filterValue = 'none';

    const previewElement = document.querySelector(
        `.effects__container .effect__${effect}`
    ) as HTMLElement;

    if (previewElement) {
        filterValue = window.getComputedStyle(previewElement).filter;
    } else {
        const tempEl = document.createElement('div');
        tempEl.className = `effect__${effect}`;
        tempEl.style.position = 'absolute';
        tempEl.style.visibility = 'hidden';
        document.body.appendChild(tempEl);

        const computedStyle = window.getComputedStyle(tempEl);
        filterValue = computedStyle.filter;

        document.body.removeChild(tempEl);
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error("Failed to get canvas context");

    ctx.filter = filterValue;
    ctx.drawImage(img, 0, 0);

    const blob = await new Promise<Blob | null>(resolve =>
        canvas.toBlob(resolve, 'image/png')
    );

    if (!blob) throw new Error("Failed to render image");

    const filteredFile = new File([blob], imgObj.file.name, { type: "image/png" });

    imagesToUpload.value.splice(index, 1, {
        ...imgObj,
        file: filteredFile,
        url: URL.createObjectURL(filteredFile)
    });
};

const togglePost = async () => {
    for (const [url, effect] of Object.entries(imagesToToggleFilter.value)) {
        await applyFilterToImageByUrl(url, effect);
    }

    const request: IInsertPostRequest = {
        targetPost: {
            description: descriptionInput.value,
            closeFriends: isPostCloseFriends.value ? isPostCloseFriends.value : undefined
        },
        images: imagesToUpload.value.map(img => img.file),
    }

    if (await ucContainer.postUsecase.createPost(request)) {
        props.closeCallback()
    }
}

const toggleStateButton = async () => {
    switch (currentStage.value) {
        case 'image-editing':
            currentStage.value = 'post-editing';
            break;
        case 'post-editing':
            await togglePost()
            break;
    }
}

onMounted(() => {
    document.body.style.overflowY = "hidden";
})

onUnmounted(() => {
    document.body.style.overflowY = "auto";
})
</script>