<template>
    <editor_array_checkbox
        v-model="model"
        v-bind="$attrs"
    ></editor_array_checkbox>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"editor_array_checkbox_json",
    inheritAttrs:true,
    components:{
        editor_array_checkbox:()=>import("./editor_array_checkbox"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>