<template>
    <FieldFileMono
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import FieldFileMono from './FieldFileMono';
import _json_object_mixin from './_json_object_mixin';
import _mono_json_struct_object_mixin from './_mono_json_struct_object_mixin';

export default {
    name: 'FieldFileMonoJson',
    components: {
        FieldFileMono,
    },
    mixins: [
        _json_object_mixin,
        _mono_json_struct_object_mixin,
    ],
    inheritAttrs: true,
};
</script>
