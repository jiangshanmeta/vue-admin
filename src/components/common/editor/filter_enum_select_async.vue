<template>
    <filter_enum_select
        v-model="model"
        v-bind="$attrs"
        :candidate="candidate"
    ></filter_enum_select>
</template>

<script>
import filter_enum_select from "./filter_enum_select"

import _async_candidate_mixin from "./_async_candidate_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"filter_enum_select_async",
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _computed_model_mixin
    ],
    components:{
        filter_enum_select,
    },
}
</script>