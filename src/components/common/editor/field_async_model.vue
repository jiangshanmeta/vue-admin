<template>
    <field_model
        v-model="model"
        :candidate="candidate"
        v-bind="$attrs"
    ></field_model>
</template>

<script>
import field_model from "./field_model.vue"

import _async_candidate_mixin from "./_async_candidate_mixin"
import _props_value_mixin from "./_props_value_mixin"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'field_async_model',
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
    components:{
        field_model
    },
}
</script>