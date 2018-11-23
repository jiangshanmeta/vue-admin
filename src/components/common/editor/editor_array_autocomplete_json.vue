<template>
    <editor_array_autocomplete
        v-model="model"
        v-bind="$attrs"
    ></editor_array_autocomplete>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"editor_array_autocomplete_json",
    inheritAttrs:true,
    components:{
        editor_array_autocomplete:()=>import("./editor_array_autocomplete"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>