<template>
    <field_time
        type="year"
        :valueFormat="valueFormat"
        v-model="model"
        v-bind="$attrs"
    ></field_time>
</template>

<script>
import field_time from "./_field_time.vue"
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:"field_year",
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
        field_time
    },
}
</script>