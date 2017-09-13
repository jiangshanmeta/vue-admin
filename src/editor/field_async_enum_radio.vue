<template>
    <field_enum_radio
        v-model="model"
        :candidate="candidate"
        :valuefield="valuefield"
        :labelfield="labelfield"
    ></field_enum_radio>
</template>

<script>
import model_mixin from "./model_mixin.js"
import label_value_mixin from "./label_value_mixin.js"
import async_candidate_mixin from "./async_candidate_mixin.js"

import field_enum_radio from "./field_enum_radio.vue"


export default {
    name:'field_async_enum_radio',
    mixins:[model_mixin,label_value_mixin,async_candidate_mixin],
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