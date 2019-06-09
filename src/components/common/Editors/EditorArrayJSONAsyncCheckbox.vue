<template>
    <EditorArrayAsyncCheckbox
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin';

export default {
    name: 'EditorArrayJSONAsyncCheckbox',
    components: {
        EditorArrayAsyncCheckbox: () => import('./EditorArrayAsyncCheckbox'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
};
</script>
