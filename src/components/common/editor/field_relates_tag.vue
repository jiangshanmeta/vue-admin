<template>
    <field_tag
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :labelfield="labelfield"
        :valuefield="valuefield"
        :validCandidate="hasCachedOptions"
    ></field_tag>
</template>

<script>
import field_tag from "./field_tag.vue"

import _field_relates_mixin from "./_field_relates_mixin.js"
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'field_relates_tag',
    inheritAttrs:true,
    mixins:[
        _field_relates_mixin,
        _props_value_array_mixin,
        _computed_model_mixin,
    ],
    components:{
        field_tag,
    },
}
</script>