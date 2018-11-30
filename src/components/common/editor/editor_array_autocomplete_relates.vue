<template>
    <editor_array_autocomplete
        v-model="model"
        v-bind="$attrs"
        :candidate="finalOptions"
        :isCandidateValid="hasCachedOptions"
    ></editor_array_autocomplete>
</template>

<script>
import _editor_relates_mixin from "./_editor_relates_mixin"
import _computed_model_mixin from "./_computed_model_mixin"
import _props_value_array_mixin from "./_props_value_array_mixin"

export default{
    name:'editor_array_autocomplete_relates',
    inheritAttrs:true,
    mixins:[
        _editor_relates_mixin,
        _computed_model_mixin,
        _props_value_array_mixin,
    ],
    components:{
        editor_array_autocomplete:()=>import("./editor_array_autocomplete")
    },
}
</script>