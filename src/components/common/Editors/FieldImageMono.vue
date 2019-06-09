<template>
    <FieldImageMulti
        v-model="model"
        class="FieldImageMono"
        v-bind="$attrs"
    />
</template>

<script>
import FieldImageMulti from './FieldImageMulti';
import _mono_multi_mixin from './_mono_multi_mixin';

export default {
    name: 'FieldImageMono',
    components: {
        FieldImageMulti,
    },
    mixins: [
        _mono_multi_mixin,
    ],
    inheritAttrs: true,
};

</script>

<style scoped>
.FieldImageMono >>> .el-upload-list:not(:empty)+.el-upload{
    display:none;
}
</style>
