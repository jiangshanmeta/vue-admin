<template>
    <filter_enum
        :candidate="finalOptions"
        :isCandidateValid="hasCachedOptions"
        v-model="model"
        v-bind="$attrs"
    ></filter_enum>
</template>

<script>
import filter_enum from "./filter_enum"

import _field_relates_mixin from "./_field_relates_mixin"
import _props_value_mixin from "./_props_value_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"filter_relates_enum",
    inheritAttrs:true,
    components:{
        filter_enum,
    },
    mixins:[
        _field_relates_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
}
</script>