<template>
    <field_enum_radio
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :isCandidateValid="hasCachedOptions"
    ></field_enum_radio>
</template>

<script>
import field_enum_radio from "./field_enum_radio.vue"

import _field_relates_mixin from "./_field_relates_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'field_relates_enum_radio',
    inheritAttrs:true,
    mixins:[
        _field_relates_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
    components:{
        field_enum_radio
    },
}
</script>