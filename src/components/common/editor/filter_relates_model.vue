<template>
    <filter_model
        :candidate="finalOptions"
        :isCandidateValid="hasCachedOptions"
        v-model="model"
        v-bind="$attrs"
    ></filter_model>
</template>

<script>
import filter_model from "./filter_model"

import _field_relates_mixin from "./_field_relates_mixin"
import _props_value_mixin from "./_props_value_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"filter_relates_model",
    inheritAttrs:true,
    components:{
        filter_model,
    },
    mixins:[
        _field_relates_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
}
</script>