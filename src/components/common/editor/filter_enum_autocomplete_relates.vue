<template>
    <filter_enum_autocomplete
        :candidate="finalOptions"
        :isCandidateValid="hasCachedOptions"
        v-model="model"
        v-bind="$attrs"
    ></filter_enum_autocomplete>
</template>

<script>
import _editor_relates_mixin from "./_editor_relates_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"filter_enum_autocomplete_relates",
    inheritAttrs:true,
    components:{
        filter_enum_autocomplete:()=>import("./filter_enum_autocomplete"),
    },
    mixins:[
        _editor_relates_mixin,
        _computed_model_mixin,
    ],
}
</script>