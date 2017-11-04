<template>
    <field_array_model
        v-model="model"
        :candidate="candidate"
        v-bind="$attrs"
    ></field_array_model>
</template>

<script>
import field_array_model from "./field_array_model.vue"

import _async_candidate_mixin from "./_async_candidate_mixin.js"
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default {
    name:'field_async_array_model',
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _props_value_array_mixin,
        _computed_model_mixin,
    ],
    components:{
        field_array_model
    },
}
</script>