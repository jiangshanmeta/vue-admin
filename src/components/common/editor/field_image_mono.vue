<template>
    <field_image_multi
        v-model="model"
        class="field_image_mono"
        v-bind="$attrs"
    ></field_image_multi>
</template>

<script>
import field_image_multi from "./field_image_multi"
import _mono_multi_mixin from "./_mono_multi_mixin"

export default{
    name:"field_image_mono",
    inheritAttrs:true,
    components:{
        field_image_multi
    },
    mixins:[
        _mono_multi_mixin
    ],
}

</script>

<style scoped>
.field_image_mono >>> .el-upload-list:not(:empty)+.el-upload{
    display:none;
}
</style>