<template>
    <field_model
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :labelfield="labelfield"
        :valuefield="valuefield"
    ></field_model>
</template>

<script>
import field_model from "./field_model.vue"

import _field_relates_mixin from "./_field_relates_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'field_relates_model',
    inheritAttrs:true,
    mixins:[
        _field_relates_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
    components:{
        field_model
    },
}
</script>