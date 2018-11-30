<template>
    <editor_enum_autocomplete
        :candidate="finalOptions"
        :isCandidateValid="hasCachedOptions"
        v-model="model"
        v-bind="$attrs"
    ></editor_enum_autocomplete>
</template>

<script>
import _editor_relates_mixin from "./_editor_relates_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'editor_enum_autocomplete_relates',
    inheritAttrs:true,
    mixins:[
        _editor_relates_mixin,
        _computed_model_mixin,
    ],
    components:{
        editor_enum_autocomplete:()=>import("./editor_enum_autocomplete")
    },
}
</script>