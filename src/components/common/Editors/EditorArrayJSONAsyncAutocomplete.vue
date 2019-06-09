<template>
    <EditorArrayAsyncAutocomplete
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin';

export default {
    name: 'EditorArrayJSONAsyncAutocomplete',
    components: {
        EditorArrayAsyncAutocomplete: () => import('./EditorArrayAsyncAutocomplete'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
};
</script>
