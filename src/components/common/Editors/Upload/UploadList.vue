<template>
    <ul
        :class="[
            'el-upload-list',
            'el-upload-list--' + listType,
            { 'is-disabled': disabled }
        ]"
    >
        <li
            v-for="(file,index) in files"
            :key="index"
            :class="['el-upload-list__item', 'is-success', focusing ? 'focusing' : '']"
            tabindex="0"
            @keydown.delete="!disabled && $emit('remove',file,index)"
            @focus="focusing = true"
            @blur="focusing = false"
            @click="focusing = false"
        >
            <img
                v-if="['picture-card', 'picture'].indexOf(listType) > -1"
                class="el-upload-list__item-thumbnail"
                :src="getImageUrl(file)"
            >
            <a
                class="el-upload-list__item-name"
                @click="handleClick(file)"
            >
                <i class="el-icon-document" />{{ getFileName(file) }}
            </a>
            <label class="el-upload-list__item-status-label">
                <i
                    :class="{
                        'el-icon-upload-success': true,
                        'el-icon-circle-check': listType === 'text',
                        'el-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
                    }"
                />
            </label>
            <i
                v-if="!disabled"
                class="el-icon-close"
                @click="$emit('remove',file,index)"
            />
            <span
                v-if="listType === 'picture-card'"
                class="el-upload-list__item-actions"
            >
                <span
                    v-if="onPreview && listType === 'picture-card'"
                    class="el-upload-list__item-preview"
                    @click="onPreview(file)"
                >
                    <i class="el-icon-zoom-in" />
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="$emit('remove',file,index)"
                >
                    <i class="el-icon-delete" />
                </span>
            </span>
        </li>
    </ul>
</template>

<script>
function identity (val) {
    return val;
}

export default {
    props: {
        files: {
            type: Array,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        onPreview: {
            type: Function,
            default: null,
        },
        listType: {
            type: String,
            validator (val) {
                return [
                    'text', 'picture', 'picture-card',
                ].includes(val);
            },
            default: 'text',
        },
        getImageUrl: {
            type: Function,
            default: identity,
        },
        getFileName: {
            type: Function,
            default: identity,
        },
    },
    data () {
        return {
            focusing: false,
        };
    },
    methods: {
        handleClick (file) {
            this.onPreview && this.onPreview(file);
        },
    },
};
</script>
