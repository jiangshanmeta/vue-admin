<template>
    <editor_time
        type="month"
        v-model="model"
        v-bind="$attrs"
    ></editor_time>
</template>

<script>
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:"editor_time_month",
    inheritAttrs:true,
    mixins:[
        _props_value_mixin,
        _computed_model_mixin,
    ],
    components:{
        editor_time:()=>import("./_editor_time"),
    },
}
</script>