<template>
    <editor_array_checkbox
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin'

export default {
    name: 'EditorArrayCheckboxJson',
    components: {
        editor_array_checkbox: () => import('./editor_array_checkbox'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
}
</script>
