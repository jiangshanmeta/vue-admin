<template>
    <field_file_multi
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin'

export default {
    name: 'FieldFileMultiJson',
    components: {
        field_file_multi: () => import('./field_file_multi'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
}
</script>
