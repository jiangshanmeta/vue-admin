<template>
    <field_array_model
        v-model="model"
        v-bind="$attrs"
    ></field_array_model>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"field_array_model_json",
    inheritAttrs:true,
    components:{
        field_array_model:()=>import("./field_array_model"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>