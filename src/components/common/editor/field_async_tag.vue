<template>
    <field_tag
        v-model="model"
        :candidate="candidate"
        :isCandidateValid="!isRequest"
        v-bind="$attrs"
    ></field_tag>
</template>

<script>
import field_tag from "./field_tag.vue"

import _async_candidate_mixin from "./_async_candidate_mixin.js"
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default {
    name:'field_async_tag',
    inheritAttrs:true,
    components:{
        field_tag,
    },
    mixins:[
        _async_candidate_mixin,
        _props_value_array_mixin,
        _computed_model_mixin,
    ],
}
</script>