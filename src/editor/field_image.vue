<template>
    <field_images
        v-model="model"
        :class="{'has-enough-value':hasEnoughValue}"
        :uri="uri"
        :labelfield="labelfield"
        :valuefield="valuefield"
    ></field_images>
</template>

<script>
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import field_images from "./field_images.vue"
export default{
    mixins:[
        _props_value_array_mixin,
        _computed_model_mixin,
    ],
    props:{
        uri:{
            type:String,
            required:true,
        },
        labelfield:{
            type:String,
            default:"name",
        },
        valuefield:{
            type:String,
            default:"url"
        }
    },
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