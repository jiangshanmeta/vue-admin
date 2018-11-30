<template>
    <editor_enum_radio
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :isCandidateValid="hasCachedOptions"
    ></editor_enum_radio>
</template>

<script>
import _editor_relates_mixin from "./_editor_relates_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:'editor_enum_radio_relates',
    inheritAttrs:true,
    mixins:[
        _editor_relates_mixin,
        _computed_model_mixin,
    ],
    components:{
        editor_enum_radio:()=>import("./editor_enum_radio"),
    },
}
</script>