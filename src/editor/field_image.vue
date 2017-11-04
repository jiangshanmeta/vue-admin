<template>
    <field_images
        v-model="model"
        :class="{'has-enough-value':hasEnoughValue}"
        v-bind="$attrs"
    ></field_images>
</template>

<script>
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import field_images from "./field_images.vue"
export default{
    name:"field_image",
    inheritAttrs:true,
    mixins:[
        _props_value_array_mixin,
        _computed_model_mixin,
    ],
    components:{
        field_images,
    },
    computed:{
        hasEnoughValue(){
            return this.value.length > 0;
        }
    }
}
</script>

<style scoped>
.has-enough-value >>> .el-upload{
    display:none;
}
</style>