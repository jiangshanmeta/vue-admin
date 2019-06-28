<template>
    <quill-editor
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import {
    quillEditor,
} from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorTextrich',
    components: {
        quillEditor,
    },
    mixins: [
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
