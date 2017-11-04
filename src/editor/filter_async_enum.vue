<template>
    <filter_enum
        v-model="model"
        v-bind="$attrs"
        :candidate="candidate"
    >
    </filter_enum>
</template>

<script>
import filter_enum from "./filter_enum.vue"

import _async_candidate_mixin from "./_async_candidate_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:"filter_async_enum",
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _props_value_mixin,
        _computed_model_mixin
    ],
    components:{
        filter_enum,
    },
}
</script>