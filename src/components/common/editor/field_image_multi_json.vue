<template>
    <field_image_multi
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin'

export default {
    name: 'FieldImageMultiJson',
    components: {
        field_image_multi: () => import('./field_image_multi'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
}
</script>
