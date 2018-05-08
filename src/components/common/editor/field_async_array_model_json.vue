<template>
    <field_async_array_model
        v-model="model"
        v-bind="$attrs"
    ></field_async_array_model>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"field_async_array_model_json",
    inheritAttrs:true,
    components:{
        field_async_array_model:()=>import("./field_async_array_model"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>