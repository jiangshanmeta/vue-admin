<template>
    <editor_time
        type="year"
        :valueFormat="valueFormat"
        v-model="model"
        v-bind="$attrs"
    ></editor_time>
</template>

<script>
import editor_time from "./_editor_time.vue"
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:"editor_time_year",
    inheritAttrs:true,
    mixins:[
        _props_value_mixin,
        _computed_model_mixin,
    ],
    props:{
        valueFormat:{
            type:String,
            default:"yyyy",
        },
    },
    components:{
        editor_time
    },
}
</script>