<template>
    <EditorArrayCheckbox
        v-model="model"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin';

export default {
    name: 'EditorArrayJSONCheckbox',
    components: {
        EditorArrayCheckbox: () => import('./EditorArrayCheckbox'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
};
</script>
