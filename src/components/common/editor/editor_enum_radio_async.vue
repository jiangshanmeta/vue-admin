<template>
    <editor_enum_radio
        v-model="model"
        :candidate="candidate"
        :isCandidateValid="!isRequest"
        v-bind="$attrs"
    ></editor_enum_radio>
</template>

<script>
import _props_value_mixin from "./_props_value_mixin"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _async_candidate_mixin from "./_async_candidate_mixin.js"

export default {
    name:'editor_enum_radio_async',
    inheritAttrs:true,
    mixins:[
        _computed_model_mixin,
        _async_candidate_mixin,
        _props_value_mixin,
    ],
    components:{
        editor_enum_radio:()=>import("./editor_enum_radio"),
    },
}
</script>