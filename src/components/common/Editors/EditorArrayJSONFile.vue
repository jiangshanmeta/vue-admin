<template>
    <EditorArrayFile
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin';

export default {
    name: 'EditorArrayJSONFile',
    components: {
        EditorArrayFile: () => import('./EditorArrayFile'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
};
</script>
