<template>
    <field_enum_radio
        v-model="model"
        :candidate="candidate"
        :valuefield="valuefield"
        :labelfield="labelfield"
    ></field_enum_radio>
</template>

<script>
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import async_candidate_mixin from "./async_candidate_mixin.js"
import _props_value_mixin from "./_props_value_mixin"
import field_enum_radio from "./field_enum_radio.vue"


export default {
    name:'field_async_enum_radio',
    mixins:[
        _computed_model_mixin,
        _props_label_value_mixin,
        async_candidate_mixin,
        _props_value_mixin,
    ],
    components:{
        field_enum_radio,
    },
    props:{

    }
}
</script>