<template>
    <filter_enum_select
        :candidate="finalOptions"
        :isCandidateValid="hasCachedOptions"
        v-model="model"
        v-bind="$attrs"
    ></filter_enum_select>
</template>

<script>
import _editor_relates_mixin from "./_editor_relates_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"filter_enum_select_relates",
    inheritAttrs:true,
    components:{
        filter_enum_select:()=>import("./filter_enum_select"),
    },
    mixins:[
        _editor_relates_mixin,
        _computed_model_mixin,
    ],
}
</script>