<template>
    <editor_time
        type="datetime"
        v-model="model"
        v-bind="$attrs"
    ></editor_time>
</template>

<script>
import editor_time from "./_editor_time.vue"
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:"editor_time_ts",
    inheritAttrs:true,
    mixins:[
        _props_value_mixin,
        _computed_model_mixin,
    ],
    components:{
        editor_time
    },
}
</script>