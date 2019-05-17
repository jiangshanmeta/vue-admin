<template>
    <editor_array_checkbox_relates
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin'
export default {
    name: 'EditorArrayCheckboxRelatesJson',
    components: {
        editor_array_checkbox_relates: () => import('./editor_array_checkbox_relates'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
}
</script>
