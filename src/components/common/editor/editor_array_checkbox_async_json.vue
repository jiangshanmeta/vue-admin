<template>
    <editor_array_checkbox_async
        v-model="model"
        v-bind="$attrs"
    ></editor_array_checkbox_async>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"editor_array_checkbox_async_json",
    inheritAttrs:true,
    components:{
        editor_array_checkbox_async:()=>import("./editor_array_checkbox_async"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>