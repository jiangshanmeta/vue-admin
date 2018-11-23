<template>
    <editor_enum_select
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :isCandidateValid="hasCachedOptions"
    ></editor_enum_select>
</template>

<script>
import editor_enum_select from "./editor_enum_select.vue"

import _editor_relates_mixin from "./_editor_relates_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'editor_enum_select_relates',
    inheritAttrs:true,
    mixins:[
        _editor_relates_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
    components:{
        editor_enum_select
    },
}
</script>