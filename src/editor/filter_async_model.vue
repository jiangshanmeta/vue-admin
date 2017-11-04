<template>
    <filter_model
        v-model="model"
        v-bind="$attrs"
        :candidate="candidate"
    ></filter_model>
</template>

<script>
import filter_model from "./filter_model.vue"

import _async_candidate_mixin from "./_async_candidate_mixin"
import _props_value_mixin from "./_props_value_mixin"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:"filter_async_model",
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _props_value_mixin,
        _computed_model_mixin
    ],
    components:{
        filter_model
    }
}
</script>