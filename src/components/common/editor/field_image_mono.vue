<template>
    <field_image_multi
        v-model="model"
        class="field_image_mono"
        v-bind="$attrs"
    />
</template>

<script>
import field_image_multi from './field_image_multi'
import _mono_multi_mixin from './_mono_multi_mixin'

export default {
    name: 'FieldImageMono',
    components: {
        field_image_multi,
    },
    mixins: [
        _mono_multi_mixin,
    ],
    inheritAttrs: true,
}

</script>

<style scoped>
.field_image_mono >>> .el-upload-list:not(:empty)+.el-upload{
    display:none;
}
</style>
