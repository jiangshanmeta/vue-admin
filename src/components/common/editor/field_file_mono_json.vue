<template>
    <field_file_mono
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import field_file_mono from './field_file_mono'
import _json_object_mixin from './_json_object_mixin'
import _mono_json_struct_object_mixin from './_mono_json_struct_object_mixin'

export default {
    name: 'FieldFileMonoJson',
    components: {
        field_file_mono,
    },
    mixins: [
        _json_object_mixin,
        _mono_json_struct_object_mixin,
    ],
    inheritAttrs: true,
}
</script>
