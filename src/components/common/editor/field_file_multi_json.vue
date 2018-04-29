<template>
    <field_file_multi
        v-model="model"
        v-bind="$attrs"
    ></field_file_multi>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"field_file_multi_json",
    inheritAttrs:true,
    components:{
        field_file_multi:()=>import("./field_file_multi"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>