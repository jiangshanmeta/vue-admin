<template>
    <field_enum_radio
        v-model="model"
        :candidate="candidate"
        :valuefield="valuefield"
        :labelfield="labelfield"
    ></field_enum_radio>
</template>

<script>
import _model_mixin from "./_model_mixin.js"
import _label_value_mixin from "./_label_value_mixin.js"
import async_candidate_mixin from "./async_candidate_mixin.js"

import field_enum_radio from "./field_enum_radio.vue"


export default {
    name:'field_async_enum_radio',
    mixins:[_model_mixin,_label_value_mixin,async_candidate_mixin],
    components:{
        field_enum_radio,
    },
    props:{
        value:{
            required:true,
        }
    }
}
</script>