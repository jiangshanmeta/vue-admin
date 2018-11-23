<template>
    <editor_array_checkbox_relates
        v-model="model"
        v-bind="$attrs"
    ></editor_array_checkbox_relates>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"
export default{
    name:"editor_array_checkbox_relates_json",
    inheritAttrs:true,
    components:{
        editor_array_checkbox_relates:()=>import("./editor_array_checkbox_relates"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>