<template>
    <editor_array_autocomplete_async
        v-model="model"
        v-bind="$attrs"
    ></editor_array_autocomplete_async>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"editor_array_autocomplete_async_json",
    inheritAttrs:true,
    components:{
        editor_array_autocomplete_async:()=>import("./editor_array_autocomplete_async"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>