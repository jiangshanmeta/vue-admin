<template>
    <editor_array_autocomplete
        v-model="model"
        :candidate="candidate"
        :isCandidateValid="!isRequest"
        v-bind="$attrs"
    ></editor_array_autocomplete>
</template>

<script>
import _async_candidate_mixin from "./_async_candidate_mixin"
import _computed_model_mixin from "./_computed_model_mixin"
import _props_value_array_mixin from "./_props_value_array_mixin"

export default {
    name:'editor_array_autocomplete_async',
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _computed_model_mixin,
        _props_value_array_mixin,
    ],
    components:{
        editor_array_autocomplete:()=>import("./editor_array_autocomplete")
    },
}
</script>