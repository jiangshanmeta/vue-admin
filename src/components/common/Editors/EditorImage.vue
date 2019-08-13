<template>
    <EditorArrayImage
        v-model="model"
        :limit="1"
        v-bind="$attrs"
    />
</template>

<script>
import _mono_multi_mixin from './_mono_multi_mixin';

export default {
    name: 'EditorImage',
    components: {
        EditorArrayImage: () => import('./EditorArrayImage'),
    },
    mixins: [
        _mono_multi_mixin,
    ],
    inheritAttrs: true,
};
</script>
