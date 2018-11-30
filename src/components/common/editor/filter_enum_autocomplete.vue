<template>
    <editor_enum_autocomplete
        v-model="model"
        :candidate="filter_candidate"
        :labelfield="labelfield"
        :valuefield="valuefield"
        v-bind="$attrs"
    ></editor_enum_autocomplete>
</template>

<script>
import _filter_all_mixin from "./_filter_all_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"filter_enum_autocomplete",
    inheritAttrs:true,
    components:{
        editor_enum_autocomplete:()=>import("./editor_enum_autocomplete"),
    },
    mixins:[
        _filter_all_mixin,
        _computed_model_mixin,
    ],
    props:{
        candidate:{
            type:Array,
            required:true,
        },
    },
}
</script>