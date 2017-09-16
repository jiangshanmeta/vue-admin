<template>
    <el-input-number
        v-model="model"
        :controls="false"
    ></el-input-number>
</template>

<script>
import _computed_model_mixin from "./_computed_model_mixin"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _props_value_number_mixin from "./_props_value_number_mixin.js"
export default{
    name:'field_number',
    mixins:[
        _computed_model_mixin,
        _props_placeholder_mixin,
        _props_value_number_mixin,
    ],
    props:{

    },
}
</script>