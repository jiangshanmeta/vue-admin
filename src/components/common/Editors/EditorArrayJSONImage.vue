<template>
    <EditorArrayImage
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin';

export default {
    name: 'EditorArrayJSONImage',
    components: {
        EditorArrayImage: () => import('./EditorArrayImage'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
};
</script>
