<template>
    <field_enum_radio
        v-model="model"
        :candidate="candidate"
        v-bind="$attrs"
    ></field_enum_radio>
</template>

<script>
import field_enum_radio from "./field_enum_radio.vue"

import _props_value_mixin from "./_props_value_mixin"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _async_candidate_mixin from "./_async_candidate_mixin.js"

export default {
    name:'field_async_enum_radio',
    inheritAttrs:true,
    mixins:[
        _computed_model_mixin,
        _async_candidate_mixin,
        _props_value_mixin,
    ],
    components:{
        field_enum_radio,
    },
}
</script>