<template>
    <editor_enum_select
        v-model="model"
        :candidate="candidate"
        :isCandidateValid="!isRequest"
        v-bind="$attrs"
    >
        <template>
            <slot></slot>
        </template>
    </editor_enum_select>
</template>

<script>
import _async_candidate_mixin from "./_async_candidate_mixin.js"
import _props_value_mixin from "./_props_value_mixin"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'editor_enum_select_async',
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
    components:{
        editor_enum_select:()=>import("./editor_enum_select"),
    },
}
</script>