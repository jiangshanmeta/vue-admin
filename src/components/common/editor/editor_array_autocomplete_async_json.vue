<template>
    <editor_array_autocomplete_async
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin'

export default {
    name: 'EditorArrayAutocompleteAsyncJson',
    components: {
        editor_array_autocomplete_async: () => import('./editor_array_autocomplete_async'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
}
</script>
