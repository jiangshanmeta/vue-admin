<template>
    <field_file_multi
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _mono_multi_mixin from './_mono_multi_mixin'

export default {
    name: 'FieldFileMono',
    components: {
        field_file_multi: () => import('./field_file_multi'),
    },
    mixins: [
        _mono_multi_mixin,
    ],
    inheritAttrs: true,
}
</script>
