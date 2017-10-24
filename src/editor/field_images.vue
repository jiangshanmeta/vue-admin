<template>
    <el-upload
        
    >
        
    </el-upload>
</template>

<script>
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
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

    },
}
</script>