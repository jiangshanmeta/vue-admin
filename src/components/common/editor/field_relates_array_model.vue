<template>
    <field_array_model
        v-model="model"
        v-bind="$attrs"
        :candidate="finalOptions"
        :isCandidateValid="hasCachedOptions"
    ></field_array_model>
</template>

<script>
import field_array_model from "./field_array_model.vue"

import _field_relates_mixin from "./_field_relates_mixin.js"
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'field_relates_array_model',
    inheritAttrs:true,
    mixins:[
        _field_relates_mixin,
        _props_value_array_mixin,
        _computed_model_mixin,
    ],
    components:{
        field_array_model,
    },
}
</script>