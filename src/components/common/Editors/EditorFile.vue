<template>
    <EditorArrayFile
        v-model="model"
        :limit="1"
        v-bind="$attrs"
    />
</template>

<script>
import _mono_multi_mixin from './_mono_multi_mixin';

export default {
    name: 'EditorFile',
    components: {
        EditorArrayFile: () => import('./EditorArrayFile'),
    },
    mixins: [
        _mono_multi_mixin,
    ],
};
</script>
