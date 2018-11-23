<template>
    <editor_enum_autocomplete
        v-model="model"
        :candidate="candidate"
        :isCandidateValid="!isRequest"
        v-bind="$attrs"
    ></editor_enum_autocomplete>
</template>

<script>
import editor_enum_autocomplete from "./editor_enum_autocomplete.vue"

import _async_candidate_mixin from "./_async_candidate_mixin"
import _props_value_mixin from "./_props_value_mixin"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'editor_enum_autocomplete_async',
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
    components:{
        editor_enum_autocomplete
    },
}
</script>