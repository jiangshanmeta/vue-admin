<template>
    <filter_enum_autocomplete
        v-model="model"
        v-bind="$attrs"
        :candidate="candidate"
    ></filter_enum_autocomplete>
</template>

<script>
import filter_enum_autocomplete from "./filter_enum_autocomplete"

import _async_candidate_mixin from "./_async_candidate_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"filter_enum_autocomplete_async",
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _computed_model_mixin
    ],
    components:{
        filter_enum_autocomplete
    }
}
</script>