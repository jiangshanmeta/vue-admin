<template>
    <editor_array_checkbox_async
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin'

export default {
    name: 'EditorArrayCheckboxAsyncJson',
    components: {
        editor_array_checkbox_async: () => import('./editor_array_checkbox_async'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
}
</script>
